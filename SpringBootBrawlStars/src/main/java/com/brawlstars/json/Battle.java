package com.brawlstars.json;

import lombok.Data;

import java.util.List;

@Data
public class Battle {
    String mode;
    String type;
    String result;
    Integer duration;
    Integer trophyChange;
    Player starPlayer;
    List<List<Player>> teams;

    // solo, duoShodown
    Integer rank;
    List<Player> players;
    Player bigBrawler;
}
