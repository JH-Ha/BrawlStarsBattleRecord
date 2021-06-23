package com.brawlstars.schedule;

import java.util.List;

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

@Component
public class RecordSchedule {
	@Autowired
	BrawlStarsAPI brawlStarsAPI;

	@Autowired
	RecordService recordService;

	@Autowired
	MemberRepository memberRepository;

	// one hour
	@Scheduled(fixedDelay = 3600000
	 ,initialDelay = 360000 // 10 minutes
	)
	public void saveRecordsSchedule() {
		saveRecords();
	}

	public void saveRecords() {

		Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(0, 10000));
		members.getContent().stream().parallel().forEach(member -> {
			String tag = member.getTag();
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			saveRecord(tag);
		});

	}

	public void saveRecord(String tag) {

		List<Item> items;
		try {
			items = brawlStarsAPI.getItems(tag);
			items.stream().forEach(item -> {
				String mode = item.getBattle().getMode();
				System.out.println(item.getBattleTime());
				if (recordService.isTrioMode(mode)) {
					recordService.saveTrio(tag, item);
				} else if (recordService.isDuo(mode)) {
					recordService.saveDuo(tag, item);
				} else if (recordService.isSolo(mode)) {
					recordService.saveSolo(tag, item);
				}
			});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void deleteRecords() {
		// TODO Auto-generated method stub
		recordService.deleteRecords();
	}
	

}
