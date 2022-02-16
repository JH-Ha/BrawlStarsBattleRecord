package com.brawlstars.json;

import java.util.List;

import lombok.Data;

@Data
public class Player {
	String tag;
	String name;
	Brawler brawler;
	
	// for duels
	List<Brawler> brawlers;
}
