package com.brawlstars.api;

import com.brawlstars.protocol.StatisticsResponse;
import com.brawlstars.service.StatisticsService;
import com.brawlstars.service.StatisticsService.StatCache;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatisticsController {

  @Autowired
  private StatisticsService statisticsService;

  @GetMapping("/api/statistics/mode/{mode}/map/{map}")
  public StatisticsResponse getStatistics(
      @PathVariable(name = "mode") String mode,
      @PathVariable(name = "map", required = false) String map,
      @RequestParam(name = "yearMonth", required = false) List<String> yearMonth) {

    // default value is recent three months
    if (yearMonth == null) {
      yearMonth = new ArrayList<>();
      LocalDate today = LocalDate.now();
      DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMM");

      for (int i = 0; i < 3; i++) {
        String iMonthsAgo = today.minusMonths(i).format(format);
        yearMonth.add(iMonthsAgo);
      }
    }
    StatCache statCache = statisticsService.getStatsFromCache(mode, map, yearMonth);
    if (statCache.getRecordResultDtos().isEmpty()) {
      yearMonth = new ArrayList<>();
      statCache = statisticsService.getStatsFromCache(mode, map, yearMonth);
    }

    StatisticsResponse res = new StatisticsResponse();
    res.setUpdated(statCache.getUpdated());
    res.setRecordResultDtos(statCache.getRecordResultDtos());
    res.setYearMonths(yearMonth);
    return res;
  }
}