package com.brawlstars.json;

import lombok.Data;

@Data
public class Player {
	String tag;
	String name;
	Brawler brawler;
}
