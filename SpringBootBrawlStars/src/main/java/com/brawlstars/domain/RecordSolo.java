package com.brawlstars.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.brawlstars.json.Item;
import com.brawlstars.json.Player;

import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("SOLO")
@Getter
@Setter
public class RecordSolo extends Record {

	public static RecordSolo createSoloRecord(String tag, Item item, Player player, Integer resultRank) {
		RecordSolo recordSolo = new RecordSolo();
		recordSolo.setTag(player.getTag());
		recordSolo.setBattleTime(item.getBattleTime());
		recordSolo.setBrawlerName(player.getBrawler().getName());
		recordSolo.setPower(player.getBrawler().getPower());
		recordSolo.setTrophies(player.getBrawler().getTrophies());
		recordSolo.setMap(item.getEvent().getMap());
		// recordSolo.setGroupKey(groupKey);
		recordSolo.setMode(item.getBattle().getMode());
		recordSolo.setType(item.getBattle().getType());
		recordSolo.setPlayerName(player.getName());
		recordSolo.setEventId(item.getEvent().getId());
		recordSolo.setBrawlerId(player.getBrawler().getId());
		if (tag.equals(player.getTag()))
			recordSolo.setTrophyChange(item.getBattle().getTrophyChange());
		recordSolo.setResultRank(resultRank);
		recordSolo.setRecordDate(item.getBattleTime().substring(0, 8));
		return recordSolo;
	}
}
