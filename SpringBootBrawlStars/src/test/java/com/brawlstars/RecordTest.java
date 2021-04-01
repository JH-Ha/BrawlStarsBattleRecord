package com.brawlstars;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.brawlstars.api.RecordController;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordSearch;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;

@SpringBootTest
public class RecordTest {
	@Autowired
	RecordService recordService;

	@Autowired
	RecordController recordController;

	@Test
	public void getResults() {
		String map = "Minecart Madness";
		RecordSearch recordSearch = new RecordSearch();
		recordSearch.setMode("gemGrab");
		recordSearch.setMap(map);
		List<RecordResultDto> records = recordController.getRecordResults(recordSearch);
		records.forEach(r -> 
			System.out.println(r.getBrawlerName() + " " + r.getResult() + " " + r.getCnt())
		);
		
	}
	@Test
	public void getSoloResults() {
		String map = "The Galaxy";
		RecordSearch recordSearch = new RecordSearch();
		recordSearch.setMode("soloShowdown");
		recordSearch.setMap(map);
		List<RecordResultDto> records = recordController.getRecordResults(recordSearch);
		records.forEach(r -> 
			System.out.println(r.getBrawlerName() + " " + r.getAverageRank() + " " + r.getCnt())
		);
	}
	
	@Test
	public void getRecordsByTag() {
		String tag = "#9QU209UYC";
		Pageable pageable = PageRequest.of(0, 10);
		RecordSearch recordSearch = new RecordSearch(); 
		Page<RecordDto> records = recordService.findByTag(tag, pageable, recordSearch);
		records.stream().forEach(record -> {
			System.out.println(record.getBattleTime());
		});
		
		tag = "#YCGPQRV90";
		records = recordService.findByTag(tag, pageable, recordSearch);
		records.stream().forEach(record -> {
			System.out.println(record.getBattleTime());
			record.getGroupRecords().stream().forEach(rr -> 
				System.out.println(rr.getPlayerName())
			);
		});
	}
	
	

	@Test
	public void saveTest() {
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
		
		Page<RecordDto> records = recordController.getRecords("#test",PageRequest.of(1,10), recordSearch);

		// List<Record> records = recordService.getFindByTag("#test");

		records.stream().forEach(r -> {
			List<RecordDto> groupRecords = r.getGroupRecords();
			groupRecords.stream().forEach(rr -> {
				System.out.println(rr.getTag() + rr.getBattleTime());
			});
		});

	}
	
	@Test
	public void savePlayers() {
		String tag = "#9QU209UYC";
		recordService.savePlayers(tag);
	}
}
