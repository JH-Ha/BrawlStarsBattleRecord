package com.brawlstars.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.repository.StatisticsRepository;
import com.brawlstars.util.CommonUtil;

@Service
@Transactional
public class StatisticsService {

	@Autowired
	StatisticsRepository statisticsRepository;

	public List<RecordResultDto> getStats(String mode, String map, List<String> yearMonth) {
		if(CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode)) {
			return getTrioStats(mode, map, yearMonth);
		} else if(CommonUtil.isDuoShowdown(mode)) {
			return getDuoSoloStats(mode, map, yearMonth);
		}
		return new ArrayList<>();
	}

	public List<RecordResultDto> getTrioStats(String mode, String map, List<String> yearMonth) {
		return statisticsRepository.getTrioStatByListYearMonth(mode, map, yearMonth);
	}

	public List<RecordResultDto> getDuoSoloStats(String mode, String map, List<String> yearMonth) {
		return statisticsRepository.getDuoSoloStatByListYearMonth(mode, map, yearMonth);
	}
}