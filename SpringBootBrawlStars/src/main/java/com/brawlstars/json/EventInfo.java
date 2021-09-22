package com.brawlstars.json;

import lombok.Data;

@Data
public class EventInfo {
	String startTime;
	String endTime;
	Event event;
}