package com.brawlstars.json;

import java.util.List;

import com.brawlstars.domain.Statistics;

import lombok.Data;

@Data
public class EventInfo {
	String startTime;
	String endTime;
	Event event;
	
	//for frontEnd
	List<Statistics> statistics;
}