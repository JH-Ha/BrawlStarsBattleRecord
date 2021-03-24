package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordResultDto {

	String brawlerName;
	String result;
	Long cnt;
	
	public RecordResultDto(String brawlerName, String result, Long cnt) {
		this.brawlerName = brawlerName;
		this.result = result;
		this.cnt = cnt;
	}
}
