package com.brawlstars.domain;

import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.service.RecordService;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Entity
@DiscriminatorValue("TRIO")
@Getter
@Setter
public class RecordTrio extends Record {

    public static RecordTrio createRecord(Item item, String tag, Player player, int playerGroupIdx, int i) {
        RecordTrio recordTrio = new RecordTrio();
        String map = item.getEvent().getMap();
        // event.mode and battle.mode are different when mode is paintBrawl.
        // The event.mode is paintBrawl, but battle.mode is gemGrab
        String mode = Optional.ofNullable(item.getEvent().getMode())
                .orElse(item.getBattle().getMode());
        String brawlerName = player.getBrawler().getName().replace("\n", " ");
        Integer trophies = player.getBrawler().getTrophies();

        recordTrio.setBattleTime(item.getBattleTime());
        recordTrio.setBrawlerName(brawlerName);
        recordTrio.setPower(player.getBrawler().getPower());
        // recordTrio.setGroupKey(groupKey);
        recordTrio.setDuration(item.getBattle().getDuration());
        recordTrio.setMap(map);
        recordTrio.setMode(mode);
        recordTrio.setType(item.getBattle().getType());
        recordTrio.setTag(player.getTag());
        recordTrio.setTrophies(trophies);
        recordTrio.setPlayerName(player.getName());
        recordTrio.setTeamId(i);
        recordTrio.setEventId(item.getEvent().getId());
        recordTrio.setBrawlerId(player.getBrawler().getId());
        recordTrio.setRecordDate(item.getBattleTime().substring(0, 8));

        boolean isStarPlayer = false;
        if (item.getBattle().getStarPlayer() != null
                && player.getTag().equals(item.getBattle().getStarPlayer().getTag())) {
            isStarPlayer = true;
        }
        recordTrio.setIsStarPlayer(isStarPlayer);
        String result = null;
        if (i == playerGroupIdx)
            result = item.getBattle().getResult();
        else
            result = RecordService.getOppositeResult(item.getBattle().getResult());

        recordTrio.setStatUpdated(false);
        recordTrio.setResult(result);
        return recordTrio;
    }


}
