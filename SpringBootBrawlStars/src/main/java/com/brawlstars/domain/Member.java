package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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
