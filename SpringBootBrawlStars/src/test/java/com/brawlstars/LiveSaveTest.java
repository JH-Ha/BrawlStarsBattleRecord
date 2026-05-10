package com.brawlstars;

import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.Item;
import com.brawlstars.remote.BrawlStarsApiService;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.service.RecordService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@EnabledIfEnvironmentVariable(named = "BRAWL_API_TOKEN", matches = ".+")
public class LiveSaveTest {

    private static final String TAG = "#9QU209UYC";

    @Autowired
    BrawlStarsApiService brawlStarsApiService;

    @Autowired
    RecordService recordService;

    @Test
    void fetchAndSave_shouldPersistRecords() throws Exception {
        // Given: 실제 API에서 배틀로그 가져오기
        List<Item> items = brawlStarsApiService.getItems(TAG);
        assertThat(items).as("API에서 배틀로그를 가져와야 함").isNotEmpty();

        // When: DB에 저장
        recordService.saveBattleLog(items, TAG);
        recordService.savePlayersInItems(items);

        // Then: 저장된 기록 조회
        Page<RecordDto> records = recordService.findByTag(TAG, PageRequest.of(0, 25), new RecordSearch());
        assertThat(records.getContent())
                .as("저장된 배틀 기록이 1건 이상이어야 함")
                .isNotEmpty();

        // 각 레코드에 배틀 시간과 브롤러 정보가 있는지 확인
        records.getContent().forEach(record -> {
            assertThat(record.getBattleTime()).as("배틀 시간이 있어야 함").isNotNull();
            assertThat(record.getGroupRecords()).as("그룹 기록이 있어야 함").isNotEmpty();
        });
    }
}
