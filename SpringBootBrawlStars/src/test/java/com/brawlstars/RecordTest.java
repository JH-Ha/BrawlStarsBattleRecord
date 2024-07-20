package com.brawlstars;

import static org.assertj.core.api.Assertions.assertThat;

import com.brawlstars.api.RecordController;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@SpringBootTest
public class RecordTest {

  @Autowired
  RecordService recordService;

  @Autowired
  RecordController recordController;

  @BeforeEach
  public void init() throws Exception {
    String tag = "#9QU209UYC";
    ClassLoader classloader = Thread.currentThread().getContextClassLoader();
    String jsonPath = classloader.getResource("sampleResponse.json").getPath();
    String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

    ObjectMapper mapper = new ObjectMapper().configure(
        DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
    List<Item> items = battleLog.getItems();
    recordService.saveBattleLog(items, tag);
    recordService.savePlayersInItems(items);
  }

  @Test
  public void getSoloResults() {
    String map = "Cavern Churn";
    RecordSearch recordSearch = new RecordSearch();
    recordSearch.setMode("soloShowdown");
    recordSearch.setMap(map);
    List<RecordResultDto> records = recordController.getRecordResults(recordSearch);

    Optional<RecordResultDto> dto = records.stream().filter(r -> r.getBrawlerName().equals("SANDY"))
        .findFirst();

    assertThat(dto.get().getRankSum()).isEqualTo(1);

  }

  @Test
  public void getTrioResults() {
    String map = "Bot Drop";
    RecordSearch recordSearch = new RecordSearch();
    recordSearch.setMode("siege");
    recordSearch.setMap(map);
    List<RecordResultDto> records = recordController.getRecordResults(recordSearch);

    Optional<RecordResultDto> dto = records.stream()
        .filter(r -> r.getBrawlerName().equals("POCO") && r.getResult().equals("victory"))
        .findFirst();

    assertThat(dto.get().getCnt()).isEqualTo(1);
  }

  @Test
  public void getDuelResult() {
    // given
    String map = "NO SURRENDER";
    RecordSearch recordSearch = new RecordSearch();
    recordSearch.setMode("duels");
    recordSearch.setMap(map);

    // When
    List<RecordResultDto> records = recordController.getRecordResults(recordSearch);

    // Then
    Optional<RecordResultDto> dto = records.stream()
        .filter(r -> r.getBrawlerName().equals("SPIKE") && r.getResult().equals("defeat"))
        .findFirst();
    assertThat(dto.orElse(new RecordResultDto()).getCnt()).isEqualTo(1);
  }

  @Test
  void getPentaRecord() {
    // Given
    String map = "Crispy Crypt";
    String mode = "knockout5V5";
    String tag = "#9QU209UYC";

    RecordSearch recordSearch = new RecordSearch();
    recordSearch.setMode(mode);
    recordSearch.setMap(map);
    recordSearch.setTag(tag);

    // When
    List<RecordResultDto> records = recordService.findByMap(recordSearch);

    // Then
    assertThat(records.size()).isEqualTo(1);
  }

  @Test
  public void getRecordsByTag() {
    String tag = "#9QU209UYC";
    Pageable pageable = PageRequest.of(0, 10);
    RecordSearch recordSearch = new RecordSearch();
    recordSearch.setMode("gemGrab");
    Page<RecordDto> records = recordService.findByTag(tag, pageable, recordSearch);
    assertThat(records.getContent().get(0).getGroupRecords().size()).isEqualTo(6);
  }


  @Test
  public void testSave() {
    recordService.removeByTag("#test1");
    recordService.removeByTag("#test");
    Record record = new Record();
    record.setBattleTime("1234");
    record.setTag("#test");
    Record test1 = new Record();
    test1.setBattleTime("123456");
    test1.setTag("#test1");
    record.getGroupRecords().add(test1);
    test1.setParent(record);
    record.getGroupRecords().add(record);
    record.setParent(record);
    recordService.save(record);

    RecordSearch recordSearch = new RecordSearch();

    Page<RecordDto> records = recordService.findByTag("#test", PageRequest.of(0, 10),
        recordSearch);

    // List<Record> records = recordService.getFindByTag("#test");

    records.stream().forEach(r -> {
      List<RecordDto> groupRecords = r.getGroupRecords();
      groupRecords.forEach(rr -> System.out.println(rr.getTag() + rr.getBattleTime())
      );
    });
    // Then
    assertThat(records.getContent().get(0).getGroupRecords().size()).isEqualTo(2);

  }

  @Test
  public void savePlayers() {
    String tag = "#9QU209UYC";
    recordService.savePlayers(tag);
  }
}
