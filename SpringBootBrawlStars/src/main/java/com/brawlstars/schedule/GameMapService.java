package com.brawlstars.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.domain.GameMap;
import com.brawlstars.repository.GameMapRepository;

@Transactional
@Service
public class GameMapService {
	@Autowired
	GameMapRepository gameMapRepository;
	
	public void saveGameMap(GameMap gameMap) {
		gameMapRepository.saveGameMap(gameMap);
	}
}
