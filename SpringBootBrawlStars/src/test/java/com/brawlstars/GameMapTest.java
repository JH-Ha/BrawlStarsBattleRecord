package com.brawlstars;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.GameMapRepository;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@TestPropertySource(properties = "app.scheduling.enable=false")
@SpringBootTest
public class GameMapTest {

    @Autowired
    RecordService recordService;
    @Autowired
    GameMapRepository gameMapRepository;

    String tag = "#9QU209UYC";

    @BeforeEach
    public void init() throws IOException, URISyntaxException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        URI jsonPath = classloader.getResource("sampleResponse.json").toURI();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper().configure(
                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();
        recordService.saveBattleLog(items, tag);
    }

    @AfterEach
    void tearDown() {
        gameMapRepository.deleteAll();
    }

    @Nested
    class SaveDistinctGameMapTest {
        @Test
        void saveDistinctGameMap() {
            // Given
            String mode = "duoShowdown";

            // When
            int savedMapCnt = recordService.saveDistinctGameMap(mode);

            // Then
            assertThat(savedMapCnt).isEqualTo(2);
        }

        @Test
        void whenModeIsNull() {
            // Given
            String mode = null;

            // When
            int saveMapCnt = recordService.saveDistinctGameMap(mode);

            // Then
            assertThat(saveMapCnt).isEqualTo(8);
        }
    }
}
