package com.brawlstars.api;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.json.EventInfo;

@RestController
public class EventController {
	
	@Autowired
	BrawlStarsAPI brawlStarsAPI;
	
	EventInfo[] eventInfos;
	
	Logger logger = LoggerFactory.getLogger(EventController.class);
	
	@PostConstruct
	public void postContruct() {
		updateEvents();
	}

	@GetMapping("/api/events/rotation")
	public EventInfo[] getEventsRotation(){
		logger.warn("/api/events/rotation called");
		return eventInfos;
	}
	
	@Scheduled(fixedDelay = 60000)
	public void updateEvents() {
		EventInfo[] eventInfos = null;
		try {
			eventInfos = brawlStarsAPI.getEventsRotation();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(eventInfos != null) {
			this.eventInfos = eventInfos;
		}
	}
}
