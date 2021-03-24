package com.brawlstars;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.domain.GameMap;
import com.brawlstars.repository.GameMapDto;
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
		List<GameMapDto> gameMapDtos = recordService.getDistinctGameMaps();
		List<GameMap> gameMaps = gameMapDtos.stream().map(dto ->{
			GameMap gameMap = new GameMap();
			gameMap.setMode(dto.getMode());
			gameMap.setName(dto.getName());
			return gameMap;
		}).collect(Collectors.toList());
		
		gameMaps.stream().forEach(map ->{
			gameMapService.saveGameMap(map);
		});
	}
}
