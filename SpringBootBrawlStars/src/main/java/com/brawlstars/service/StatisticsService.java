package com.brawlstars.service;

import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.repository.StatisticsRepository;
import com.brawlstars.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class StatisticsService {

    @Autowired
    StatisticsRepository statisticsRepository;

    final int CACHE_TIME = 1_800_000; // milliseconds. 30 minutes
    final private String DELIMITER = "_";

    public static class StatCache {

        private long updated;
        private List<RecordResultDto> recordResultDtos;

        public long getUpdated() {
            return updated;
        }

        public void setUpdated(long updated) {
            this.updated = updated;
        }

        public List<RecordResultDto> getRecordResultDtos() {
            return recordResultDtos;
        }

        public void setRecordResultDtos(
                List<RecordResultDto> recordResultDtos) {
            this.recordResultDtos = recordResultDtos;
        }
    }

    private final Map<String, StatCache> cache = new HashMap<>();

    public String makeKey(String mode, String map, List<String> yearMonth) {
        if (yearMonth != null && !yearMonth.isEmpty()) {
            return String.join(DELIMITER, mode, map, String.join(DELIMITER, yearMonth));
        } else {
            return String.join(DELIMITER, mode, map);
        }
    }

    public List<RecordResultDto> getStats(String mode, @Nullable String map, List<String> yearMonth) {
        if (CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode)) {
            return getTrioStats(mode, map, yearMonth);
        } else if (CommonUtil.isDuoShowdown(mode) || CommonUtil.isSolo(mode)) {
            return getDuoSoloStats(mode, map, yearMonth);
        }
        return new ArrayList<>();
    }

    public StatCache getStatsFromCache(String mode, @Nullable String map,
                                       @Nullable List<String> yearMonth) {
        final String key = makeKey(mode, map, yearMonth);
        StatCache statCache = cache.get(key);
        long now = System.currentTimeMillis();
        if (statCache == null || (now - statCache.getUpdated()) >= CACHE_TIME) {
            List<RecordResultDto> resultDtos = getStats(mode, map, yearMonth);
            statCache = new StatCache();
            statCache.setUpdated(now);
            statCache.setRecordResultDtos(resultDtos);
            cache.put(key, statCache);
        }
        return statCache;

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