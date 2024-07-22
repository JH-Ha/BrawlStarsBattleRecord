package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class AccessHistory {
    @Id
    @GeneratedValue
    @Column(name = "access_history_id")
    Long id;
    String ip;
    String url;
    ZonedDateTime accessDate;
    String userAgent;

    public static AccessHistory createHistory(String ip, String url, ZonedDateTime accessDate, String userAgent) {
        AccessHistory accessHistory = new AccessHistory();

        accessHistory.setIp(ip);
        accessHistory.setUrl(url);
        accessHistory.setAccessDate(accessDate);
        accessHistory.setUserAgent(userAgent);

        return accessHistory;
    }
}
