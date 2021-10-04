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
	public List<Statistics> getStats(String mode, String map){
		return statisticsRepository.findByModeAndMap( mode,  map);
	}
	
}