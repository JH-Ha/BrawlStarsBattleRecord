package com.brawlstars.schedule;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.service.RecordService;
import com.brawlstars.util.CommonUtil;

@Component
public class RecordSchedule {
	@Autowired
	BrawlStarsAPI brawlStarsAPI;

	@Autowired
	RecordService recordService;

	@Autowired
	MemberRepository memberRepository;

	Logger logger = LoggerFactory.getLogger(RecordSchedule.class);
	// one hour
	@Scheduled(fixedDelay = 3600000
	 //,initialDelay = 360000 // 10 minutes
	)
	public void saveRecordsSchedule() {
		saveRecords();
	}

	public void saveRecords() {

		Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(0, 10000));
		members.getContent().stream().parallel().forEach(member -> {
			String tag = member.getTag();
			logger.info("save member : " + member.getName() + " tag : " + tag);
			saveRecord(tag);
		});

	}

	public void saveRecord(String tag) {

		List<Item> items;
		try {
			items = brawlStarsAPI.getItems(tag);
			items.stream().forEach(item -> {
				String mode = item.getBattle().getMode();
				if (CommonUtil.isTrioMode(mode)) {
					recordService.saveTrio(tag, item);
				} else if (CommonUtil.isDuo(mode)) {
					recordService.saveDuo(tag, item);
				} else if (CommonUtil.isSolo(mode)) {
					recordService.saveSolo(tag, item);
				}
			});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	//
	// This lefts recent 50 records,and delete old records.
	
	@Scheduled(fixedDelay = 8640000 // 1 day
			 ,initialDelay = 1 // 10 minutes
			)
	public void deleteRecords() {
		Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(0, 10000));
		members.getContent().stream().forEach(member -> {
			String tag = member.getTag();
			logger.debug("delete member : " + tag );
			recordService.deleteOldRecords(tag, 50L);
		});
	}
	
	//every hour
	@Scheduled(cron = "0 15 * * * *")
	public void updateStatistics() {
		ZonedDateTime now = ZonedDateTime.now(ZoneId.of("UTC"));
		ZonedDateTime oneHourAgo = now.minusSeconds(3600);
		String nowStr = now.toString().replace(":","").replace("-","");
		nowStr = nowStr.substring(0,nowStr.indexOf("."));
		String oneHourAgoStr = oneHourAgo.toString().replace(":","").replace("-","");
		oneHourAgoStr = oneHourAgoStr.substring(0, oneHourAgoStr.indexOf("."));
		System.out.println(nowStr + " " + oneHourAgoStr);
		recordService.saveStats(oneHourAgoStr, nowStr);
	}
//
//	public void deleteRecords() {
//		// TODO Auto-generated method stub
//		recordService.deleteRecords();
//	}
	

}
