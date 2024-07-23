package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
