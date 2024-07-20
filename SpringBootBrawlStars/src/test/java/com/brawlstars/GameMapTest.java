package com.brawlstars;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;
import static org.assertj.core.api.Assertions.assertThat;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@TestPropertySource(properties = "app.scheduling.enable=false")
@SpringBootTest
public class GameMapTest {

  @Autowired
  RecordService recordService;
  @Autowired
  GameMapService gameMapService;

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
  public void saveDistinctGameMap() {
    String mode = "duoShowdown";

    int savedMapCnt = recordService.saveDistinctGameMap(mode);

    assertThat(2).isEqualTo(savedMapCnt);
  }
}
