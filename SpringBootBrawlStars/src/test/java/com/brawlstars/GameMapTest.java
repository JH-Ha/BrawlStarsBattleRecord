package com.brawlstars;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;

@SpringBootTest
public class GameMapTest {
	@Autowired
	RecordService recordService;
	@Autowired
	GameMapService gameMapService;
	
	@Test
	public void saveDistinctGameMap() {
		recordService.saveDistinctGameMap();
	
	}
}
