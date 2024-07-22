package com.brawlstars.json.playerInfo;

import lombok.Data;

import java.util.List;

@Data
public class BrawlerAtPlayerInfo {
    Integer id;
    String name;
    Integer power;
    Integer rank;
    Integer trophies;
    Integer highestTrophies;

    List<StarPower> starPowers;
    List<Gadget> gadgets;
}
