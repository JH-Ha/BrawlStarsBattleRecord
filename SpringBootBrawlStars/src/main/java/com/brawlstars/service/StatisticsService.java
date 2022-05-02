package com.brawlstars.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import java.util.Map;
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

  final int CACHE_TIME = 30; // MINUTES

  static class CacheContainer {

    LocalDateTime localDateTime;
    List<RecordResultDto> recordResultDtos;

    public LocalDateTime getLocalDateTime() {
      return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
      this.localDateTime = localDateTime;
    }

    public List<RecordResultDto> getRecordResultDtos() {
      return recordResultDtos;
    }

    public void setRecordResultDtos(
        List<RecordResultDto> recordResultDtos) {
      this.recordResultDtos = recordResultDtos;
    }
  }

  private final Map<String, CacheContainer> cache = new HashMap<>();

  public String makeKey(String mode, String map, List<String> yearMonth) {
    return mode + map + String.join("", yearMonth);
  }

  public List<RecordResultDto> getStats(String mode, String map, List<String> yearMonth) {
    if (CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode)) {
      return getTrioStats(mode, map, yearMonth);
    } else if (CommonUtil.isDuoShowdown(mode) || CommonUtil.isSolo(mode)) {
      return getDuoSoloStats(mode, map, yearMonth);
    }
    return new ArrayList<>();
  }

  public List<RecordResultDto> getStatsFromCache(String mode, String map, List<String> yearMonth) {
    final String key = makeKey(mode, map, yearMonth);
    CacheContainer cacheContainer = cache.get(key);
    LocalDateTime now = LocalDateTime.now();
    if (cacheContainer == null
        || cacheContainer.getLocalDateTime().until(now, ChronoUnit.MINUTES) >= CACHE_TIME) {
      List<RecordResultDto> resultDtos = getStats(mode, map, yearMonth);
      CacheContainer newCacheContainer = new CacheContainer();
      newCacheContainer.setLocalDateTime(now);
      newCacheContainer.setRecordResultDtos(resultDtos);
      cache.put(key, newCacheContainer);
      return resultDtos;
    } else {
      return cacheContainer.getRecordResultDtos();
    }
  }

  public List<RecordResultDto> getTrioStats(String mode, String map, List<String> yearMonth) {
    return statisticsRepository.getTrioStatByListYearMonth(mode, map, yearMonth);
  }

  public List<RecordResultDto> getDuoSoloStats(String mode, String map, List<String> yearMonth) {
    return statisticsRepository.getDuoSoloStatByListYearMonth(mode, map, yearMonth);
  }
}