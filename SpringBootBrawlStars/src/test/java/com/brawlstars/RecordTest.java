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
}
