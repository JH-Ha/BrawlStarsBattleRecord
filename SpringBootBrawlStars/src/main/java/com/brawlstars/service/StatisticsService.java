package com.brawlstars.service;

import com.brawlstars.cache.StatsCache;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.repository.StatisticsRepository;
import com.brawlstars.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StatisticsService {

    @Autowired
    StatisticsRepository statisticsRepository;

    public List<RecordResultDto> getStats(String mode, @Nullable String map, List<String> yearMonth) {
        if (CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode) || CommonUtil.isPentaMode(mode)) {
            return getTrioStats(mode, map, yearMonth);
        } else if (CommonUtil.isDuoShowdown(mode) || CommonUtil.isSolo(mode)) {
            return getDuoSoloStats(mode, map, yearMonth);
        }
        return new ArrayList<>();
    }

    @Cacheable(cacheNames = "statsCache", keyGenerator = "statsKeyGenerator")
    public StatsCache getStatsFromCache(String mode, @Nullable String map, @Nullable List<String> yearMonths) {
        long now = System.currentTimeMillis();
        List<RecordResultDto> resultDtos = getStats(mode, map, yearMonths);
        StatsCache statsCache = new StatsCache();
        statsCache.setUpdated(now);
        statsCache.setRecordResultDtos(resultDtos);

        return statsCache;
    }

    public List<RecordResultDto> getTrioStats(String mode, @Nullable String map,
                                              @Nullable List<String> yearMonth) {
        return statisticsRepository.getTrioStatByListYearMonth(mode, map, yearMonth);
    }

    public List<RecordResultDto> getDuoSoloStats(String mode, @Nullable String map,
                                                 @Nullable List<String> yearMonth) {
        return statisticsRepository.getDuoSoloStatByListYearMonth(mode, map, yearMonth);
    }
}