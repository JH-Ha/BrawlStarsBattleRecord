package com.brawlstars.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.domain.Statistics;
import com.brawlstars.service.StatisticsService;

@RestController
public class StatisticsController {
	@Autowired
	private StatisticsService statisticsService;
	
	@GetMapping("/api/statistics/mode/{mode}/map/{map}")
	public List<Statistics> getStatistics(
			@PathVariable(name = "mode")String mode,
			@PathVariable(name = "map") String map){
		return statisticsService.getStats(mode, map);
		
	}
}
