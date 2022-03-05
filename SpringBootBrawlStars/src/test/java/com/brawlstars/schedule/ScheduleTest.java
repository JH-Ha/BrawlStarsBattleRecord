package com.brawlstars.schedule;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.MemberService;
import com.brawlstars.service.RecordService;
import com.brawlstars.service.StatisticsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class ScheduleTest {
	@Autowired
	RecordSchedule recordSchedule;
	
	@Autowired
	MemberService memberService;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	RecordService recordService;
	@Autowired
	StatisticsService statisticsService;
	
	
	@BeforeEach
	public void init() throws JsonMappingException, JsonProcessingException {
		String tag = "#9QU209UYC";
		Scanner scanner = new Scanner(getClass().getResourceAsStream("../sampleResponse.txt"));
		StringBuilder sb = new StringBuilder();
		while(scanner.hasNext()) {
			sb.append(scanner.nextLine());
		}
		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		BattleLog battleLog = mapper.readValue(sb.toString(), BattleLog.class);	
		List<Item> items = battleLog.getItems(); 
		recordService.saveBattleLog(items, tag);
		recordService.savePlayersInItems(items);
	}
	
	@Test
	public void saveRecordsTest() {
		//recordSchedule.saveRecords();
	}
	
	@Test
	public void deleteRecordstTest() {
		recordService.deleteOldRecords("#9QU209UYC", 10L);
		
	}
	
	@Test
	public void saveStatisticsTest() {
		recordSchedule.updateStatistics();
		
		LocalDate localDate = LocalDate.now();
		String yearMonth = localDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
		List<String> yearMonthList = new ArrayList<>();
		yearMonthList.add(yearMonth);
		
		List<RecordResultDto> recordResultDtos = statisticsService.getStats("siege", "Bot Drop", yearMonthList);
		recordResultDtos.forEach(a -> {
			System.out.println(a.getBrawlerName() + " " + a.getResult() + " " + a.getCnt());
		});
		RecordResultDto recordResultDto = recordResultDtos.stream().filter(a -> a.getBrawlerName().equals("BARLEY")).findFirst().get();
		assertThat(recordResultDto.getResult()).isEqualTo("victory");
	}
}
