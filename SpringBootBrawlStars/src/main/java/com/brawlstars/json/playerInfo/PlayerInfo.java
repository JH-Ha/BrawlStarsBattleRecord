package com.brawlstars.json.playerInfo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PlayerInfo {

    Club club;

    //Java Object name cannot be started from a number
    @JsonProperty(value = "3vs3Victories")
    String threeVsThreeVictories;

    String isQualifiedFromChampionshipChallenge;
    Icon icon;
    String tag;
    String name;
    Integer trophies;
    Integer expLevel;
    Integer expPoints;
    Integer highestTrophies;
    Integer soloVictories;
    Integer duoVictories;
    Integer bestRoboRumbleTime;
    Integer bestTimeAsBigBrawler;
    List<BrawlerAtPlayerInfo> brawlers;
    String nameColor;
}
