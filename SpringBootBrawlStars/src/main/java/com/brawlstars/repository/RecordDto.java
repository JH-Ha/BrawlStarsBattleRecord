package com.brawlstars.repository;

import java.util.List;
import java.util.stream.Collectors;

import com.brawlstars.domain.Record;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordDto {
	public RecordDto() {

	}

	public RecordDto(Record record) {
		// TODO Auto-generated constructor stub
		tag = record.getTag();
		battleTime = record.getBattleTime();
		brawlerName = record.getBrawlerName();
		power = record.getPower();
		trophies = record.getTrophies();
		groupRecords = record.getGroupRecords().stream().map(r -> RecordDto.createGroupRecord(r))
				.collect(Collectors.toList());
	}

	public static RecordDto createGroupRecord(Record record) {
		RecordDto recordDto = new RecordDto();
		recordDto.setTag(record.getTag());
		recordDto.setBattleTime(record.getBattleTime());
		recordDto.setBrawlerName(record.getBrawlerName());
		recordDto.setPower(record.getPower());
		recordDto.setTrophies(record.getTrophies());
		return recordDto;
	}

	private String tag;
	private String battleTime;
	private String brawlerName;
	private Integer power;
	private Integer trophies;
	List<RecordDto> groupRecords;
}
