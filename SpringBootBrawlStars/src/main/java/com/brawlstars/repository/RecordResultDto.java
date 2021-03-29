package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordResultDto {
	private String brawlerName;
	private String result;
	private Long cnt;
	private Double averageRank;
	
	public RecordResultDto(String brawlerName, String result, Long cnt) {
		this.brawlerName = brawlerName;
		this.result = result;
		this.cnt = cnt;
	}
	public RecordResultDto(String brawlerName, Double averageRank, Long cnt) {
		this.brawlerName = brawlerName;
		this.averageRank = averageRank;
		this.cnt = cnt;
	}
}
