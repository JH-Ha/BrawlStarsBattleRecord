package com.brawlstars;

import java.util.List;
import java.util.Scanner;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.service.MemberService;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class MemberTest {
	@Autowired
	MemberService memberService;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	RecordService recordService;
	
	@BeforeEach
	public void init() throws JsonMappingException, JsonProcessingException {
		String tag = "#9QU209UYC";
		Scanner scanner = new Scanner(getClass().getResourceAsStream("sampleResponse.txt"));
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
	public void findMemberByTag() {
		String tag = "#9QU209UYC";
		String name = "폼폼";
		
		MemberDto foundMember = memberRepository.findMemberByTag(tag);
		Assertions.assertThat(foundMember.getName()).isEqualTo(name);
	}
	
	@Test
	public void findAll() {
		Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(0, 10));
		Assertions.assertThat(members.getSize()).isEqualTo( 10);
	}
	
}
