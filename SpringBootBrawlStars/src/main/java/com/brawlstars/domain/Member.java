package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Member {
	@Id
	@GeneratedValue
	@Column(name = "member_id")
	private Long id;
	
	@Column(unique =  true)
	private String tag;
	private String name;
	@ColumnDefault("false")
	private boolean isDeleted;
	
	public static Member createMember(String tag, String name) {
		Member member =  new Member();
		member.setTag(tag);
		member.setName(name);
		member.isDeleted = false;
		return member;
	}
}
