package com.brawlstars;

import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RecordServiceTest {

    @Autowired
    RecordService recordService;

    @BeforeEach
    void init() throws Exception {
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
    void testFindByMapWhenModeIsSolo() {
        // Given
        String map = "Cavern Churn";
        RecordSearch recordSearch = new RecordSearch();
        recordSearch.setMode("soloShowdown");
        recordSearch.setMap(map);

        // When
        List<RecordResultDto> records = recordService.findByMap(recordSearch);

        // Then
        Optional<RecordResultDto> dto = records.stream().filter(r -> r.getBrawlerName().equals("SANDY"))
                .findFirst();

        assertThat(dto.get().getRankSum()).isEqualTo(1);

    }

    @Test
    void testFindByMapWhenModeIsTrio() {
        // Given
        String map = "Bot Drop";
        RecordSearch recordSearch = new RecordSearch();
        recordSearch.setMode("siege");
        recordSearch.setMap(map);

        // When
        List<RecordResultDto> records = recordService.findByMap(recordSearch);

        // Then
        Optional<RecordResultDto> dto = records.stream()
                .filter(r -> r.getBrawlerName().equals("POCO") && r.getResult().equals("victory"))
                .findFirst();

        assertThat(dto.get().getCnt()).isEqualTo(1);
    }

    @Test
    void testFindByMapWhenModeIsDuels() {
        // given
        String map = "NO SURRENDER";
        RecordSearch recordSearch = new RecordSearch();
        recordSearch.setMode("duels");
        recordSearch.setMap(map);

        // When
        List<RecordResultDto> records = recordService.findByMap(recordSearch);

        // Then
        Optional<RecordResultDto> dto = records.stream()
                .filter(r -> r.getBrawlerName().equals("SPIKE") && r.getResult().equals("defeat"))
                .findFirst();
        assertThat(dto.orElse(new RecordResultDto()).getCnt()).isEqualTo(1);
    }

    @Test
    void testFindByMapWhenModeIsPenta() {
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
    void testFindByTag() {
        // Given
        String tag = "#9QU209UYC";
        Pageable pageable = PageRequest.of(0, 10);
        RecordSearch recordSearch = new RecordSearch();
        recordSearch.setMode("gemGrab");

        // When
        Page<RecordDto> records = recordService.findByTag(tag, pageable, recordSearch);

        // Then
        assertThat(records.getContent().get(0).getGroupRecords().size()).isEqualTo(6);
    }


    @Test
    void testSave() {
        // Given
        Record record1 = new Record();
        record1.setBattleTime("1234");
        record1.setTag("#test_tag1");

        Record record2 = new Record();
        record2.setBattleTime("123456");
        record2.setTag("#test_tag2");

        record1.getGroupRecords().add(record2);
        record2.setParent(record1);
        record1.getGroupRecords().add(record1);
        record1.setParent(record1);

        // When
        recordService.save(record1);

        // Then
        Page<RecordDto> records = recordService.findByTag("#test_tag1", PageRequest.of(0, 10),
                new RecordSearch());
        assertThat(records.getContent().get(0).getGroupRecords().size()).isEqualTo(2);
    }

    @Test
    void testSavePlayers() {
        // Given
        String tag = "#9QU209UYC";

        // When
        recordService.savePlayers(tag);
    }
}
