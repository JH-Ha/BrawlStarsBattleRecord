package com.brawlstars.json;

import lombok.Data;

import java.util.List;

@Data
public class Player {
    String tag;
    String name;
    Brawler brawler;

    // for duels
    List<Brawler> brawlers;
}
