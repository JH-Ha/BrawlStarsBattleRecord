package com.brawlstars.json;

import java.util.List;

import lombok.Data;

@Data
public class BattleLog {
	List<Item> items;
	Paging paging;
}
