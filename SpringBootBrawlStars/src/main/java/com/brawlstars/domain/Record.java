package com.brawlstars.domain;

import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.service.RecordService;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type")
@Getter
@Setter
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "uniqueGame", columnNames = {"tag", "battleTime", "brawlerName"})},
    indexes = {
        @Index(name = "gameStatIdx", columnList = "mode, map, statUpdated"),
        @Index(name = "gameTrendIdx", columnList = "recordDate, mode, map, brawlerName"),
        @Index(name = "recordJoinIdx", columnList = "group_key, record_id")
    })
public class Record {

  @Id
  @GeneratedValue
  @Column(name = "record_id")
  private Long id;

  @Column(length = 8)
  private String recordDate;
  @Column(length = 20)
  private String tag;
  @Column(length = 25)
  private String battleTime;
  @Column(length = 25)
  private String brawlerName;
  @Column(length = 25)
  private String brawlerId;
  private Integer power;
  private Integer trophies;
  private Integer trophyChange;

  @Column(length = 50)
  private String map;

  @Column(length = 25)
  private String eventId;

  @Column(length = 100)
  private String playerName;

  // @Column(name = "group_key", insertable = false, updatable = false)
  // private String groupKey;
  @Column(length = 50)
  private String mode;

  @Column(length = 25)
  private String type;

  //Trio
  private Integer duration;
  private Boolean isStarPlayer;
  @Column(length = 50)
  private String result;

  private Integer teamId;
  //duo, solo
  private Integer resultRank;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "group_key", foreignKey = @ForeignKey(name = "none"))
  private Record parent;

  @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
  private List<Record> groupRecords = new ArrayList<>();

  @ColumnDefault("false")
  private Boolean statUpdated;

  @ColumnDefault("false")
  private Boolean isStatCandidate;

  public static void setRelation(Record parent, List<Record> groupRecords) {
    parent.setGroupRecords(groupRecords);
    groupRecords.stream().forEach(gr -> {
      gr.setParent(parent);
    });
  }

  public static Record createTeamRecord(RecordFactory recordFactory, Item item, String tag, Player player, int playerGroupIdx,
      int i) {
    Record record = recordFactory.create();
    String map = item.getEvent().getMap();
    // event.mode and battle.mode are different when mode is 5 vs 5
    String mode = Optional.ofNullable(item.getEvent().getMode())
            .orElse(item.getBattle().getMode());
    String brawlerName = player.getBrawler().getName().replace("\n", " ");
    Integer trophies = player.getBrawler().getTrophies();

    record.setBattleTime(item.getBattleTime());
    record.setBrawlerName(brawlerName);
    record.setPower(player.getBrawler().getPower());
    record.setDuration(item.getBattle().getDuration());
    record.setMap(map);
    record.setMode(mode);
    record.setType(item.getBattle().getType());
    record.setTag(player.getTag());
    record.setTrophies(trophies);
    record.setPlayerName(player.getName());
    record.setTeamId(i);
    record.setEventId(item.getEvent().getId());
    record.setBrawlerId(player.getBrawler().getId());
    record.setRecordDate(item.getBattleTime().substring(0, 8));

    boolean isStarPlayer = false;
    if (item.getBattle().getStarPlayer() != null
        && player.getTag().equals(item.getBattle().getStarPlayer().getTag())) {
      isStarPlayer = true;
    }
    record.setIsStarPlayer(isStarPlayer);
    String result = null;
    if (i == playerGroupIdx) {
      result = item.getBattle().getResult();
    } else {
      result = RecordService.getOppositeResult(item.getBattle().getResult());
    }

    record.setStatUpdated(false);
    record.setResult(result);
    return record;
  }
}
