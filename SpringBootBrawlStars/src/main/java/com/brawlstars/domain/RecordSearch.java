package com.brawlstars.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordSearch {
	private String map;
	private String tag;
	private String mode;
	private String brawlerName;
	private String trophyRange;
	private String start;
	private String end;
	private Boolean statUpdated;
}
