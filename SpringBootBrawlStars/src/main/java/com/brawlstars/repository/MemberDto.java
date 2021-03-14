package com.brawlstars.repository;

import com.brawlstars.domain.Member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
	public MemberDto() {

	}

	public MemberDto(Member member) {
		tag = member.getTag();
		name = member.getName();
	}

	String tag;
	String name;
}
