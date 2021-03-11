package com.brawlstars.repository;

import java.util.List;

import com.brawlstars.domain.Record;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordDto {
	public RecordDto(Record record) {
		// TODO Auto-generated constructor stub
		tag = record.getTag();
		battleTime = record.getBattleTime();
		brawlerName = record.getBrawlerName();
		power = record.getPower();
		trophies = record.getTrophies();
		groupRecords = record.getGroupRecords();
	}
	private String tag;
	private String battleTime;
	private String brawlerName;
	private Integer power;
	private Integer trophies;
	List<Record> groupRecords;
}
