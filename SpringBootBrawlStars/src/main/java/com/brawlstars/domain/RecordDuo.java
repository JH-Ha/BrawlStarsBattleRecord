package com.brawlstars.domain;

import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("DUO")
@Getter
@Setter
public class RecordDuo extends Record {

  public static RecordDuo createDuo(String tag, Player player, Item item, Integer rank) {
    String mode = item.getBattle().getMode(); // event mode -> battle mode : event mode is null
    String map = item.getEvent().getMap();
    String brawlerName = player.getBrawler().getName();
    Integer trophies = player.getBrawler().getTrophies();

    RecordDuo recordDuo = new RecordDuo();
    recordDuo.setTag(player.getTag());
    recordDuo.setBattleTime(item.getBattleTime());
    recordDuo.setBrawlerName(brawlerName);
    recordDuo.setPower(player.getBrawler().getPower());
    recordDuo.setTrophies(trophies);

    recordDuo.setMap(map);
    recordDuo.setMode(mode);
    recordDuo.setType(item.getBattle().getType());
    recordDuo.setResultRank(rank);
    recordDuo.setPlayerName(player.getName());
    recordDuo.setEventId(item.getEvent().getId());
    recordDuo.setBrawlerId(player.getBrawler().getId());

    recordDuo.setStatUpdated(false);
    recordDuo.setRecordDate(item.getBattleTime().substring(0, 8));
    if (tag.equals(player.getTag())) {
      recordDuo.setTrophyChange(item.getBattle().getTrophyChange());
    }
    return recordDuo;
  }
}
