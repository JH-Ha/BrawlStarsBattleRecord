package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Statistics {

	@Id
	@GeneratedValue
	@Column(name="statistics_id")
	private Long id;
	private String map;
	private String mode;
	private String brawlerName;
	private String result;
	private Long cnt;
	private Long rankSum;
	private String statsYearMonth;
	
	@Version
	private Long version;
	
}
