package com.brawlstars;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.domain.Member;
import com.brawlstars.repository.MemberRepository;

@SpringBootTest
public class MemberTest {
	@Autowired
	MemberRepository memberRepository;
	
	@Test
	public void saveMember() {
		String tag = "#9QU209UYC";
		String name = "ÆûÆû";
		Member member = new Member();
		member.setTag(tag);
		member.setName(name);
		memberRepository.save(member);
		
		Member foundMember = memberRepository.findOne(tag);
		Assertions.assertEquals(foundMember.getName(), name);
	}
}
