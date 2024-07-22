package com.brawlstars.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Statistics {

    @Id
    @GeneratedValue
    @Column(name = "statistics_id")
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
