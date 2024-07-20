package com.brawlstars.repository;

import com.brawlstars.domain.GameMap;
import com.brawlstars.domain.QGameMap;
import com.brawlstars.util.CommonUtil;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameMapRepository {

  @Autowired
  private EntityManager em;

  @Autowired
  private JPAQueryFactory queryFactory;

  public void saveGameMap(GameMap gameMap) {
    if (gameMap.getId() == null) {
      em.persist(gameMap);
    } else {
      em.merge(gameMap);
    }
  }

  public List<GameMapDto> findByNameAndMode(String name, String mode) {
    QGameMap qGameMap = QGameMap.gameMap;

    List<GameMapDto> gameMapDtos = queryFactory
        .select(Projections.constructor(GameMapDto.class
            , qGameMap.name
            , qGameMap.mode
            , qGameMap.startTime
            , qGameMap.endTime
        ))
        .from(qGameMap)
        .where(qGameMap.isDeleted.eq(false)
            , qGameMap.name.eq(name)
            , qGameMap.mode.eq(mode))
        .fetch();
    return gameMapDtos;
  }

  public GameMap findOneByNameAndMode(String name, String mode) {
    QGameMap qGameMap = QGameMap.gameMap;
    GameMap gameMap = queryFactory.select(qGameMap)
        .from(qGameMap)
        .where(qGameMap.isDeleted.eq(false)
            , qGameMap.name.eq(name)
            , qGameMap.mode.eq(mode))
        .fetchOne();
    return gameMap;
  }

  public List<GameMapDto> getGameMaps(String mode) {
    QGameMap qGameMap = QGameMap.gameMap;

    BooleanBuilder builder = new BooleanBuilder();
    builder.and(qGameMap.isDeleted.eq(false));

    if (!CommonUtil.isAll(mode)) {
      builder.and(qGameMap.mode.eq(mode));
    }

    List<GameMapDto> gameMapDtos = queryFactory
        .select(Projections.constructor(GameMapDto.class
            , qGameMap.name
            , qGameMap.mode
            , qGameMap.startTime
            , qGameMap.endTime
        ))
        .from(qGameMap)
        .where(builder)
        .fetch();
    return gameMapDtos;
  }

}
