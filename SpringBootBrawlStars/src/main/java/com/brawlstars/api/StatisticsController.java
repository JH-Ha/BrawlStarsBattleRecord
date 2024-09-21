package com.brawlstars.api;

import com.brawlstars.cache.StatsCache;
import com.brawlstars.protocol.StatisticsResponse;
import com.brawlstars.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/api/statistics/mode/{mode}/map/{map}")
    public StatisticsResponse getStatistics(
            @PathVariable(name = "mode") String mode,
            @PathVariable(name = "map") String map,
            @RequestParam(name = "yearMonth", required = false) List<String> yearMonths) {

        // default value is recent three months
        if (yearMonths == null) {
            yearMonths = new ArrayList<>();
            LocalDate today = LocalDate.now();
            DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMM");

            for (int i = 0; i < 3; i++) {
                String iMonthsAgo = today.minusMonths(i).format(format);
                yearMonths.add(iMonthsAgo);
            }
        }
        StatsCache statsCache = statisticsService.getStatsFromCache(mode, map, yearMonths);
        if (statsCache.getRecordResultDtos().isEmpty()) {
            yearMonths = new ArrayList<>();
            statsCache = statisticsService.getStatsFromCache(mode, map, yearMonths);
        }

        StatisticsResponse res = new StatisticsResponse();
        res.setUpdated(statsCache.getUpdated());
        res.setRecordResultDtos(statsCache.getRecordResultDtos());
        res.setYearMonths(yearMonths);
        return res;
    }
}