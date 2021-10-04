package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Statistics {

	@Id @GeneratedValue
	@Column(name="statistics_id")	
	private Long id;
	private String map;
	private String mode;
	private String brawlerName;
	private String result;
	private Long cnt;
	private Long rankSum;
	
	@Version
	private Long version;
	
}
