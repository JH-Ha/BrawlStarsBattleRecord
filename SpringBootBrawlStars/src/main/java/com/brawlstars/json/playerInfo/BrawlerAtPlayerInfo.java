package com.brawlstars.json.playerInfo;

import java.util.List;

import lombok.Data;

@Data
public class BrawlerAtPlayerInfo {
	List<StarPower> starPowers;
	List<Gadget> gadgets;
}
