package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordResultDto {
	private String brawlerName;
	private String result;
	private Long cnt;
	private Integer rankSum;
	
	public RecordResultDto(String brawlerName, String result, Long cnt) {
		this.brawlerName = brawlerName;
		this.result = result;
		this.cnt = cnt;
	}
	public RecordResultDto(String brawlerName, Integer rankSum, Long cnt) {
		this.brawlerName = brawlerName;
		this.rankSum = rankSum;
		this.cnt = cnt;
	}
	
	public RecordResultDto(String brawlerName, Long cnt) {
		this.brawlerName = brawlerName;
		this.cnt = cnt;
	}
}
