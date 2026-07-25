package com.brawlstars;

import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;
import com.brawlstars.util.BrawlMode;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * 2026년 실제 API 응답 형식을 사용해 saveBattleLog가 정상 동작하는지 확인.
 * - event.mode = "unknown" (siege modeId=48) 이 포함된 응답에서도
 *   다른 모드(duoShowdown, gemGrab 등)가 정상 저장되는지 검증.
 */
@SpringBootTest
public class SiegeRecordSaveTest {

    @Autowired
    RecordService recordService;

    private static final String TAG = "#9QU209UYC";

    @BeforeEach
    void setUp() throws Exception {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        URI jsonPath = cl.getResource("sampleResponse2026.json").toURI();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();

        recordService.saveBattleLog(items, TAG);
    }

    /**
     * duoShowdown 기록이 저장되는지 확인.
     * JSON에 Molten to the Core duoShowdown 2전 포함 (rank 1, rank 3).
     */
    @Test
    void duoShowdownBattles_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.DUO_SHOWDOWN.value);
        search.setMap("Molten to the Core");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("duoShowdown Molten to the Core 기록이 저장되어야 함").isNotEmpty();

        long totalCount = results.stream()
                .mapToLong(r -> r.getCnt() != null ? r.getCnt() : 0)
                .sum();
        // rank 1(FINX) + rank 3(FINX) = 2전
        assertThat(totalCount).isGreaterThanOrEqualTo(2);
    }

    /**
     * event.mode = "unknown" 인 siege 배틀이 포함된 응답에서도
     * 그 앞뒤의 다른 모드 기록은 중단 없이 저장되는지 확인.
     * JSON 순서: duoShowdown → siege(unknown) → duoShowdown → siege(unknown)...
     */
    @Test
    void battlesAroundUnknownMode_shouldNotBeInterrupted() {
        // JSON에서 tag 기준으로 저장된 전체 기록 조회
        Page<RecordDto> records = recordService.findByTag(TAG, PageRequest.of(0, 20), new RecordSearch());

        // duoShowdown 2전 + (siege는 unknown이어서 별도 처리) 최소 2건 이상 저장되어야 함
        assertThat(records.getContent()).as("최소 2건 이상 기록이 저장되어야 함").hasSizeGreaterThanOrEqualTo(2);
    }

    /**
     * unknown event.mode 가 포함된 응답에서 정상적인 duoShowdown 모드의
     * 브롤러별 랭킹 집계가 가능한지 확인.
     */
    @Test
    void duoShowdownStatsByBrawler_shouldBeCalculatable() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.DUO_SHOWDOWN.value);
        search.setTag(TAG);

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("duoShowdown 통계가 계산되어야 함").isNotEmpty();

        // FINX(rank1, rank3 두 번) 기록이 있어야 함
        Optional<RecordResultDto> finx = results.stream()
                .filter(r -> "FINX".equals(r.getBrawlerName()))
                .findFirst();
        assertThat(finx).as("FINX 브롤러 기록이 있어야 함").isPresent();
    }
}
