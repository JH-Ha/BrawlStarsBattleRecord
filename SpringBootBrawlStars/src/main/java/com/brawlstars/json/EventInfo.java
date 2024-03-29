package com.brawlstars.json;

import java.util.List;

import com.brawlstars.repository.RecordResultDto;

import lombok.Data;

@Data
public class EventInfo {
	String startTime;
	String endTime;
	Event event;
	
	//for frontEnd
	List<RecordResultDto> statistics;
}