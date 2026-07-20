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

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Verifies saveBattleLog correctly persists a mix of modes from a real 2026 API
 * response (sampleResponseMixedModes2026.json): bounty, hotZone, brawlBall,
 * heist (event.map=null), soloShowdown, duoShowdown, and a "Brawl Arena" event
 * (event.mode="brawlArena", modeId=48, battle.mode="siege") — its own distinct
 * mode using the same 3v3 team format as any other trio mode.
 */
@SpringBootTest
public class MixedModeBattleSaveTest {

    private static final String TAG = "#9QU209UYC";

    @Autowired
    RecordService recordService;

    @BeforeEach
    void setUp() throws Exception {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        URI jsonPath = cl.getResource("sampleResponseMixedModes2026.json").toURI();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();

        recordService.saveBattleLog(items, TAG);
    }

    @Test
    void bountyRecord_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.BOUNTY.value);
        search.setMap("Hideout");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("bounty Hideout record should be saved").isNotEmpty();
    }

    @Test
    void hotZoneRecord_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.HOT_ZONE.value);
        search.setMap("Dueling Beetles");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("hotZone Dueling Beetles record should be saved").isNotEmpty();
    }

    @Test
    void brawlBallRecord_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.BRAWL_BALL.value);
        search.setMap("Super Beach");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("brawlBall Super Beach record should be saved").isNotEmpty();
    }

    /**
     * The heist battle in the fixture arrives with event.id=0 and event.map=null,
     * a real response shape. It should still be saved even without map info, so
     * check via a tag-wide lookup instead of the map-based search.
     */
    @Test
    void heistRecordWithNullMap_shouldBeSaved() {
        Page<RecordDto> records = recordService.findByTag(TAG, PageRequest.of(0, 20), new RecordSearch());

        boolean heistSaved = records.getContent().stream()
                .anyMatch(r -> BrawlMode.HEIST.value.equals(r.getMode()));

        assertThat(heistSaved).as("heist record without map info should still be saved").isTrue();
    }

    @Test
    void soloShowdownRecord_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.SOLO_SHOWDOWN.value);
        search.setMap("Rockwall Brawl");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("soloShowdown Rockwall Brawl record should be saved").isNotEmpty();
    }

    @Test
    void duoShowdownRecord_shouldBeSaved() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.DUO_SHOWDOWN.value);
        search.setMap("Flying Fantasies");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("duoShowdown Flying Fantasies record should be saved").isNotEmpty();
    }

    /**
     * A "Brawl Arena" event (event.mode="brawlArena", modeId=48, battle.mode="siege")
     * uses the standard 3v3 team format but is its own distinct mode, not siege.
     * BrawlMode.BRAWL_ARENA is a recognized TRIO-category mode, so it's routed
     * through saveTrio and stored/queried under mode="brawlArena".
     */
    @Test
    void brawlArenaEvent_shouldBeSavedAsBrawlArena() {
        RecordSearch search = new RecordSearch();
        search.setMode(BrawlMode.BRAWL_ARENA.value);
        search.setMap("Knockout Grounds");

        List<RecordResultDto> results = recordService.findByMap(search);

        assertThat(results).as("brawlArena record should be saved under mode=brawlArena").isNotEmpty();
    }
}
