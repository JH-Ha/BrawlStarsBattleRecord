package com.brawlstars.api;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.json.EventInfo;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;
import com.brawlstars.service.StatisticsService;

@RestController
public class EventController {
	
	@Autowired
	BrawlStarsAPI brawlStarsAPI;
	
	@Autowired
	RecordService recordService;
	
	@Autowired
	StatisticsService statisticsService;
	
	@Autowired
	GameMapService gameMapService;
	
	EventInfo[] eventInfos;
	
	Logger logger = LoggerFactory.getLogger(EventController.class);
	
	@PostConstruct
	public void postContruct() {
		updateEvents();
	}

	@GetMapping("/api/events/rotation")
	public EventInfo[] getEventsRotation(){
		logger.info("/api/events/rotation called");
		return eventInfos;
	}
	
	@Scheduled(fixedDelay = 60000)
	public void updateEvents() {
		EventInfo[] eventInfos = null;
		try {
			eventInfos = brawlStarsAPI.getEventsRotation();
			List<String> yearMonth = new ArrayList<>();
			LocalDate today = LocalDate.now();
			DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMM");
			
			for(int i = 0; i < 3; i++) {
				String iMonthsAgo = today.minusMonths(i).format(format);
				yearMonth.add(iMonthsAgo);	
			}

			for (EventInfo eventInfo : eventInfos) {
				String mode = eventInfo.getEvent().getMode();

				List<RecordResultDto> statistics = statisticsService.getStats(mode, eventInfo.getEvent().getMap(), yearMonth);
				gameMapService.updateTime(mode, eventInfo.getEvent().getMap(), eventInfo.getStartTime(), eventInfo.getEndTime());
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
