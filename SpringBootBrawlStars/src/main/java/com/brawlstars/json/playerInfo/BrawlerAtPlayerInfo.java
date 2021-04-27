package com.brawlstars.json.playerInfo;

import java.util.List;

import lombok.Data;

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
