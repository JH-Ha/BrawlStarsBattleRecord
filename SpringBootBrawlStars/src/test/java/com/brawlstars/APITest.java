package com.brawlstars;


import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordRepository;
import com.brawlstars.service.RecordService;

import jdk.jfr.Description;

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
	
	@Description("Brawl Stars API�� ȣ���� ���������� battleLog�� ���������� Ȯ���Ѵ�.")
	@Test
	public void getBattleLog() throws Exception {
		String tag = "#9QU209UYC";
		List<Item> items = null;
		items = brawlStarsAPI.getItems(tag);
		//25���� brawl Starts API �������� �����´�
		Assertions.assertThat(items.size()).isEqualTo(25);
	}
	
	@Test
	public void getPlayerInfo() throws Exception {
		String tag = "#9QU209UYC";
		PlayerInfo playerInfo = null;
		
		playerInfo = brawlStarsAPI.getPlayerInfo(tag);
		
		String name = playerInfo.getName();
		assertThat(name).isEqualTo("����");
	}
}
