package com.brawlstars.service;

import com.brawlstars.cache.StatsCache;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class StatisticsServiceTest {
    @Autowired
    StatisticsService statisticsService;
    @Autowired
    RecordService recordService;

    String yearMonth;

    @BeforeEach
    void init() throws IOException, URISyntaxException {
        String tag = "#9QU209UYC";
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        Path path = Paths.get(classloader.getResource("sampleResponse.json").toURI());
        String sampleJsonStr = Files.readString(path);

        ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(sampleJsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();
        recordService.saveBattleLog(items, tag);
        recordService.saveStats();

        LocalDate localDate = LocalDate.now();
        yearMonth = localDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
    }

    @Test
    void testGetStatsFromCache() {
        // Given
        String mode = "soloShowdown";
        String map = "Cavern Churn";
        List<String> yearMonths = List.of(yearMonth);

        // When
        StatsCache statsCache1 = statisticsService.getStatsFromCache(mode, map, yearMonths);
        StatsCache statsCache2 = statisticsService.getStatsFromCache(mode, map, yearMonths);

        // Then
        assertThat(statsCache1.getRecordResultDtos()).isNotEmpty();
        assertThat(statsCache1.getUpdated()).isEqualTo(statsCache2.getUpdated());
    }

}
