package com.brawlstars.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

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
	Date accessDate;
	String userAgent;
	
	public static AccessHistory createHisotry(String ip, String url, Date accessDate, String userAgent) {
		AccessHistory accessHistory = new AccessHistory();
		
		accessHistory.setIp (ip);
		accessHistory.setUrl (url);
		accessHistory.setAccessDate(accessDate);
		accessHistory.setUserAgent(userAgent);
		
		return accessHistory;
	}
}
