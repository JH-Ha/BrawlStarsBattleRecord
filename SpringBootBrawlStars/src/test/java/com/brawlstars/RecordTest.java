package com.brawlstars;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.domain.Record;
import com.brawlstars.service.RecordService;

@SpringBootTest
public class RecordTest {
	@Autowired
	RecordService recordService;
	
	@Test
	public void getRecordsByTag() {
		String tag = "#9QU209UYC";
		List<Record> records = recordService.getFindByTag(tag); 
		records.stream().forEach(record ->{
			System.out.println(record.getBattleTime());
		});
	}
	@Test
	public void saveTest() {
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
		
		List<Record> records = recordService.getFindByTag("#test");
		
		records.stream().forEach(r ->{
			List<Record> groupRecords = r.getGroupRecords();
			groupRecords.stream().forEach(rr ->{
				System.out.println(rr.getTag() + rr.getBattleTime());
			});
		});
		
	}
}
