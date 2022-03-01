package com.brawlstars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brawlstars.domain.Statistics;

public interface StatisticsRepositoryInterface extends JpaRepository<Statistics, Long>{

	Statistics findByModeAndMapAndBrawlerNameAndResult(String mode, String map, String brawlerName, String result);
	
	Statistics findByModeAndMapAndBrawlerNameAndResultAndYearMonth(String mode, String map, String brawlerName, String result, String yearMonth);

	Statistics findByModeAndMapAndBrawlerName(String mode, String map, String brawlerName);
	
	Statistics findByModeAndMapAndBrawlerNameAndYearMonth(String mode, String map, String brawlerName, String yearMonth);

	List<Statistics> findByModeAndMapAndYearMonth(String mode, String map, String yearMonth);
	
}