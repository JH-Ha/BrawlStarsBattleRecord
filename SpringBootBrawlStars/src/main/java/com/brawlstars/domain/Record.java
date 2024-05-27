package com.brawlstars.domain;

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
}
