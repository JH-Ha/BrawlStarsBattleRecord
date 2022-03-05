package com.brawlstars;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.web.servlet.MockMvc;

import com.brawlstars.api.StatisticsController;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class StatisticsControllerTest {

	@SpyBean
	StatisticsController statisticsController;
	
	@Autowired
	RecordService recordService;
	
	@Autowired
	private MockMvc mockMvc;
	
	
	@BeforeEach
	public void init() throws JsonMappingException, JsonProcessingException {
		String tag = "#9QU209UYC";
		Scanner scanner = new Scanner(getClass().getResourceAsStream("./sampleResponse.txt"));
		StringBuilder sb = new StringBuilder();
		while(scanner.hasNext()) {
			sb.append(scanner.nextLine());
		}
		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		BattleLog battleLog = mapper.readValue(sb.toString(), BattleLog.class);
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
		mockMvc.perform(get("/api/statistics/mode/"+ mode +"/map/" + map))
		.andDo(print())
		.andExpect(status().isOk());
		//.andExpect(jsonPath(, matcher))
		// Then
	}
	
	@Test
	public void testGetStatisticsWhenModeIsDuoshodown() throws Exception {
		// Given
		String mode = "duoShowdown";
		String map = "Acid Lakes";
		
		// When
		mockMvc.perform(get("/api/statistics/mode/"+ mode +"/map/" + map))
		.andDo(print())
		.andExpect(status().isOk());
		//.andExpect(jsonPath(, matcher))
		// Then
	}
}
