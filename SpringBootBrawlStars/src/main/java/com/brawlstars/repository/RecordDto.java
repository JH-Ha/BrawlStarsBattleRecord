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
		trophyChange = record.getTrophyChange();
		map = record.getMap();
		mode = record.getMode();
		type = record.getType();
		duration = record.getDuration();
		isStarPlayer = record.getIsStarPlayer();
		result = record.getResult();
		resultRank = record.getResultRank();
		playerName = record.getPlayerName();
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
		recordDto.setIsStarPlayer(record.getIsStarPlayer());
		recordDto.setResult(record.getResult());
		recordDto.setResultRank(record.getResultRank());
		recordDto.setPlayerName(record.getPlayerName());
		return recordDto;
	}

	private String tag;
	private String battleTime;
	private String brawlerName;
	private Integer power;
	private Integer trophies;
	private Integer trophyChange;
	private String map;
	private String mode;
	private String type;
	

	//Trio
	private Integer duration;
	private Boolean isStarPlayer;
	private String result;
	
	//duo, solo
	private Integer resultRank;
	
	private String playerName;
	
	List<RecordDto> groupRecords;
}
