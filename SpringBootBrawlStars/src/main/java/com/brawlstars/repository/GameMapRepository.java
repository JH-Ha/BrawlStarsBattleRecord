package com.brawlstars.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.GameMap;
import com.brawlstars.domain.QGameMap;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;

@Repository
public class GameMapRepository {

	@Autowired
	private EntityManager em;
	public void saveGameMap(GameMap gameMap) {
		// TODO Auto-generated method stub
		if(gameMap.getId() == null) {
			em.persist(gameMap);
		}else {
			em.merge(gameMap);
		}
	}
	
	public List<GameMapDto> findByNameAndMode(String name, String mode) {
		JPAQuery<GameMap> query = new JPAQuery<GameMap>(em);
		QGameMap qGameMap = QGameMap.gameMap;
		List<GameMapDto> gameMapDtos = query.select(Projections.constructor(GameMapDto.class 
					,qGameMap.name
				    ,qGameMap.mode
				))
		.from(qGameMap)
		.where(qGameMap.isDeleted.eq(false)
				.and(qGameMap.name.eq(name)
				.and(qGameMap.mode.eq(mode))))
		.fetch();
		return gameMapDtos;
	}
	
	public List<GameMapDto> getGameMaps(String mode){
		JPAQuery<GameMap> query = new JPAQuery<GameMap>(em);
		QGameMap qGameMap = QGameMap.gameMap;
		List<GameMapDto> gameMapDtos = query.select(Projections.constructor(GameMapDto.class 
					,qGameMap.name
				    ,qGameMap.mode
				))
		.from(qGameMap)
		.where(qGameMap.isDeleted.eq(false))
		.fetch();
		return gameMapDtos;
	}

}
