package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DailyTrend {
	@Id
	@GeneratedValue
	@Column(name = "daily_trend_id")
	private Long id;
	private String mode;
	private String brawlerName;
	private Long cnt;
}
