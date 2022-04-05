package com.brawlstars.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.QStatistics;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class StatisticsRepository {

  @Autowired
  private EntityManager em;

  @Autowired
  JPAQueryFactory queryFactory;

  public List<RecordResultDto> getTrioStatByListYearMonth(String mode, String map,
      List<String> yearMonth) {
    QStatistics qStatistics = QStatistics.statistics;

    return queryFactory.select(
            Projections.constructor(RecordResultDto.class,
                qStatistics.brawlerName,
                qStatistics.result,
                qStatistics.cnt.sum()))
        .from(qStatistics)
        .where(qStatistics.mode.eq(mode),
            qStatistics.map.eq(map),
            qStatistics.statsYearMonth.in(yearMonth))
        .groupBy(qStatistics.brawlerName, qStatistics.result).fetch();
  }

  public List<RecordResultDto> getDuoSoloStatByListYearMonth(String mode, String map,
      List<String> yearMonth) {
    QStatistics qStatistics = QStatistics.statistics;

    return queryFactory.select(
            Projections.constructor(RecordResultDto.class, qStatistics.brawlerName,
                qStatistics.rankSum.sum(),
                qStatistics.cnt.sum()))
        .from(qStatistics)
        .where(qStatistics.mode.eq(mode), qStatistics.map.eq(map),
            qStatistics.statsYearMonth.in(yearMonth))
        .groupBy(qStatistics.brawlerName)
        .fetch();
  }
}