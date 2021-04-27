package com.brawlstars;


import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordRepository;
import com.brawlstars.service.RecordService;

@SpringBootTest
public class APITest {
	@Autowired
	RecordRepository recordRepository;
	@Autowired
	RecordService recordService;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	BrawlStarsAPI brawlStarsAPI;
	
	@Test
	public void getBattleLog() {
		String tag = "#9QU209UYC";
		List<Item> items;
		try {
			items = brawlStarsAPI.getItems(tag);
			recordService.saveBattleLog(items, tag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void getPlayerInfo() {
		String tag = "#9QU209UYC";
		PlayerInfo playerInfo = null;
		try {
			playerInfo = brawlStarsAPI.getPlayerInfo(tag);
			String name = playerInfo.getName();
			assertThat(name, is("ÆûÆû"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
