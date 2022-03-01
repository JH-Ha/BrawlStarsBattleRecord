package com.brawlstars.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brawlstars.domain.Statistics;

public interface StatisticsRepositoryInterface extends JpaRepository<Statistics, Long>{

	Statistics findByModeAndMapAndBrawlerNameAndResult(String mode, String map, String brawlerName, String result);
	
	Statistics findByModeAndMapAndBrawlerNameAndResultAndStatsYearMonth(String mode, String map, String brawlerName, String result, String yearMonth);

	Statistics findByModeAndMapAndBrawlerName(String mode, String map, String brawlerName);
	
	Statistics findByModeAndMapAndBrawlerNameAndStatsYearMonth(String mode, String map, String brawlerName, String yearMonth);	
}