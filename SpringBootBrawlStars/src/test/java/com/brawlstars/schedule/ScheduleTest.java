package com.brawlstars.schedule;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ScheduleTest {
	@Autowired
	RecordSchedule recordSchedule;
	
	@Test
	public void saveRecordsTest() {
		recordSchedule.saveRecords();
	}
	
	@Test
	public void updateUser() {
		
	}
}
