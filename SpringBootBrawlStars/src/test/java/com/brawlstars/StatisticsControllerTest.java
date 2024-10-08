package com.brawlstars;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.hamcrest.Matchers.emptyArray;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StatisticsControllerTest {

    @Autowired
    RecordService recordService;

    @Autowired
    private MockMvc mockMvc;


    @BeforeEach
    public void init() throws Exception {
        String tag = "#9QU209UYC";
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        URI jsonPath = classloader.getResource("sampleResponse.json").toURI();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper().configure(
                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();
        recordService.saveBattleLog(items, tag);
        recordService.savePlayersInItems(items);
        recordService.saveStats();
    }


    @Test
    public void testGetStatisticsWhenYearMonthIsNotSent() throws Exception {
        // Given
        String mode = "siege";
        String map = "Bot Drop";

        // When
        mockMvc.perform(get("/api/statistics/mode/" + mode + "/map/" + map))
                // Then
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recordResultDtos", not(emptyArray())));
    }

    @Test
    public void testGetStatisticsWhenModeIsDuoShowdown() throws Exception {
        // Given
        String mode = "duoShowdown";
        String map = "Acid Lakes";

        // When
        mockMvc.perform(get("/api/statistics/mode/" + mode + "/map/" + map))
                // Then
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recordResultDtos", not(emptyArray())));
    }
}
