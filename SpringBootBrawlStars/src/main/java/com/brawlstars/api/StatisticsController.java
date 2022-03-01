package com.brawlstars.api;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.StatisticsService;
import com.brawlstars.util.CommonUtil;

@RestController
public class StatisticsController {
	@Autowired
	private StatisticsService statisticsService;
	
	@GetMapping("/api/statistics/mode/{mode}/map/{map}")
	public List<RecordResultDto> getStatistics(
			@PathVariable(name = "mode")String mode,
			@PathVariable(name = "map") String map,
			@RequestParam(name = "yearMonth", required = false) List<String> yearMonth){
		
		// default value is recent three months
		if(yearMonth == null) {
			yearMonth = new ArrayList<>();
			LocalDate today = LocalDate.now();
			DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMM");
			
			for(int i = 0; i < 3; i++) {
				String iMonthsAgo = today.minusMonths(i).format(format);
				yearMonth.add(iMonthsAgo);	
			}
		}
		
		if(CommonUtil.isTrioMode(mode)) {
			return statisticsService.getTrioStats(mode, map, yearMonth);
		}else if(CommonUtil.isDuoShowdown(mode)) {
			return statisticsService.getDuoSoloStats(mode, map, yearMonth);
		} else {
			// TODO : add duel
			return statisticsService.getTrioStats(mode, map, yearMonth);
		}
	}
}
