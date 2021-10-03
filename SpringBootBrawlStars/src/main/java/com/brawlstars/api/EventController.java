package com.brawlstars.api;

import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.EventInfo;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;

@RestController
public class EventController {
	
	@Autowired
	BrawlStarsAPI brawlStarsAPI;
	
	@Autowired
	RecordService recordService;
	
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
			for(int i = 0; i < eventInfos.length; i ++) {
				EventInfo eventInfo = eventInfos[i];
				String mode = eventInfo.getEvent().getMode();
				RecordSearch recordSearch = new RecordSearch();
				recordSearch.setMode(mode);
				recordSearch.setMap(eventInfo.getEvent().getMap());
				List<RecordResultDto> statistics = recordService.findByMap(recordSearch);
				eventInfo.setStatistics(statistics);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(eventInfos != null) {
			this.eventInfos = eventInfos;
		}
	}
}
