package com.brawlstars.schedule;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.MemberService;
import com.brawlstars.service.RecordService;
import com.brawlstars.service.StatisticsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import static org.assertj.core.api.Assertions.assertThat;

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
	public void init() throws JsonProcessingException {
		String tag = "#9QU209UYC";
		ClassLoader classloader = Thread.currentThread().getContextClassLoader();
		Scanner scanner = new Scanner(classloader.getResourceAsStream("sampleResponse.json"));
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
	public void deleteRecordsTest() {
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
		recordResultDtos.forEach(a -> System.out.println(a.getBrawlerName() + " " + a.getResult() + " " + a.getCnt()));
		RecordResultDto recordResultDto = recordResultDtos.stream().filter(a -> a.getBrawlerName().equals("BARLEY")).findFirst().get();
		assertThat(recordResultDto.getResult()).isEqualTo("victory");
	}

	@Test
	@Disabled
	public void comparePerformanceOfSaveRecordMethods(){
		// Given
		int pageSize = 100;
		int page = 0;
		recordService.deleteAllRecords();

		// When
		Long t1 = System.currentTimeMillis();
		//recordSchedule.saveRecordsV1(page, pageSize);
		Long t2 = System.currentTimeMillis();
		long savedV1 = recordService.getRecordCount();
		recordService.deleteAllRecords();

		Executor executor = Executors.newFixedThreadPool(100, new ThreadFactory() {
			@Override
			public Thread newThread(Runnable r) {
				Thread t = new Thread(r);
				t.setDaemon(true);
				return t;
			}
		});
		Long t3 = System.currentTimeMillis();
		recordSchedule.saveRecordsV2(page, pageSize, executor);
		Long t4 = System.currentTimeMillis();
		long savedV2 = recordService.getRecordCount();
		Long timeV1 = t2 - t1;
		Long timeV2 = t4 - t3;

		// Then
		System.out.println("V1 : " + timeV1 + " V1 saved : " + savedV1);
		System.out.println("V2 : " + timeV2 + " V2 saved : " + savedV2);
		assertThat(savedV1).isEqualTo(savedV2);
		assertThat(timeV2).isLessThan(timeV1);
	}
}
