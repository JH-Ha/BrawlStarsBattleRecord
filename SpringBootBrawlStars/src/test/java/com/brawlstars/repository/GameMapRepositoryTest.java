package com.brawlstars.repository;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class GameMapRepositoryTest {

    @Autowired
    GameMapRepository gameMapRepository;
    @Autowired
    RecordService recordService;

    String tag = "#9QU209UYC";

    @BeforeEach
    public void init() throws IOException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        String jsonPath = classloader.getResource("sampleResponse.json").getPath();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper().configure(
                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();
        recordService.saveBattleLog(items, tag);
    }

    @Test
    void testGetGameMaps() {
        // Given
        String mode = "gemGrab";

        // When
        List<GameMapDto> gameMaps = gameMapRepository.getGameMaps(mode);

        // Then
        assertThat(gameMaps.stream().allMatch(gameMapDto -> gameMapDto.getMode().equals(mode))).isTrue();
    }
}