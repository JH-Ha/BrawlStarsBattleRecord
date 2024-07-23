package com.brawlstars.json;

import lombok.Data;

import java.util.List;

@Data
public class BattleLog {
    List<Item> items;
    Paging paging;
}
