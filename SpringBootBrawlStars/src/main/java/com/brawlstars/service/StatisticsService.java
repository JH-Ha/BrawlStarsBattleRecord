package com.brawlstars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.domain.Statistics;
import com.brawlstars.repository.StatisticsRepository;

@Service
@Transactional
public class StatisticsService {
	@Autowired
	StatisticsRepository statisticsRepository;
	
	public void saveTrioStat(String mode, String map, String brawlerName, String result) {
		Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerNameAndResult(mode, map, brawlerName, result);
		if(statistics == null) {
			statistics = new Statistics();
			statistics.setMode(mode);
			statistics.setMap(map);
			statistics.setBrawlerName(brawlerName);
			statistics.setResult(result);
			statistics.setCnt(1L);
			statisticsRepository.save(statistics);
		}else {
			statistics.setCnt(statistics.getCnt() + 1);
		}
	}
	public void saveDuoSoloStat(String mode, String map, String brawlerName, Long rank) {
		Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerName(mode, map, brawlerName);
		if(statistics == null) {
			statistics = new Statistics();
			statistics.setMode(mode);
			statistics.setMap(map);
			statistics.setBrawlerName(brawlerName);
			statistics.setRankSum(rank);
			statistics.setCnt(1L);
			statisticsRepository.save(statistics);
		}else {
			statistics.setCnt(statistics.getCnt() + 1);
			statistics.setRankSum(statistics.getRankSum() + 1);
		}
	}
	public List<Statistics> getStats(String mode, String map){
		return statisticsRepository.findByModeAndMap( mode,  map);
	}
}