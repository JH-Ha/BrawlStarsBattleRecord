package com.brawlstars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brawlstars.domain.Statistics;

public interface StatisticsRepository extends JpaRepository<Statistics, Long>{

	Statistics findByModeAndMapAndBrawlerNameAndResult(String mode, String map, String brawlerName, String result);

	Statistics findByModeAndMapAndBrawlerName(String mode, String map, String brawlerName);

	List<Statistics> findByModeAndMap(String mode, String map);
	
}