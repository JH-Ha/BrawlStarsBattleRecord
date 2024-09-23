package com.brawlstars.repository;

import com.brawlstars.domain.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticsRepository extends JpaRepository<Statistics, Long>, StatisticsRepositoryCustom {

    Statistics findByModeAndMapAndBrawlerNameAndResult(String mode, String map, String brawlerName, String result);

    Statistics findByModeAndMapAndBrawlerNameAndResultAndStatsYearMonth(String mode, String map, String brawlerName, String result, String yearMonth);

    Statistics findByModeAndMapAndBrawlerName(String mode, String map, String brawlerName);

    Statistics findByModeAndMapAndBrawlerNameAndStatsYearMonth(String mode, String map, String brawlerName, String yearMonth);
}