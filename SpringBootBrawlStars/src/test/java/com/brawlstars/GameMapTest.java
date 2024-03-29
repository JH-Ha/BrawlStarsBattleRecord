package com.brawlstars;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;
import static org.assertj.core.api.Assertions.assertThat;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.List;
import java.util.Scanner;
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
  public void init() throws JsonProcessingException {
    ClassLoader classloader = Thread.currentThread().getContextClassLoader();
    InputStream inputStream = classloader.getResourceAsStream("sampleResponse.txt");
    Scanner scanner = new Scanner(inputStream);
    StringBuilder sb = new StringBuilder();
    while (scanner.hasNext()) {
      sb.append(scanner.nextLine());
    }
    ObjectMapper mapper = new ObjectMapper().configure(FAIL_ON_UNKNOWN_PROPERTIES, false);
    BattleLog battleLog = mapper.readValue(sb.toString(), BattleLog.class);
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
