package com.brawlstars;

import static org.assertj.core.api.Assertions.assertThat;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Scanner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GameMapTest {

  @Autowired
  RecordService recordService;
  @Autowired
  GameMapService gameMapService;

  String tag = "#9QU209UYC";

  @BeforeEach
  public void init() throws JsonProcessingException {
    Scanner scanner = new Scanner(getClass().getResourceAsStream("sampleResponse.txt"));
    StringBuilder sb = new StringBuilder();
    while (scanner.hasNext()) {
      sb.append(scanner.nextLine());
    }
    ObjectMapper mapper = new ObjectMapper().configure(
        DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
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
