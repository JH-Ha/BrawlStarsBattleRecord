package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordDto {
	private String tag;
	private String battleTime;
	private String brawlerName;
	private Integer power;
	private Integer trophies;
}
