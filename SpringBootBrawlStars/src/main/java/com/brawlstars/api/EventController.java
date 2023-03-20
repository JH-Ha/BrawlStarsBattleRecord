package com.brawlstars.api;

import com.brawlstars.json.EventInfo;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.schedule.GameMapService;
import com.brawlstars.service.RecordService;
import com.brawlstars.service.StatisticsService;
import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

  Map<String, String> mapNameToMode = new HashMap<>();

  @PostConstruct
  public void postContruct() {
    updateEvents();
    String[] huntersMapNames = {
        "Trials and Tribulations",
        "Hunting Season",
        "The Prey",
        "Quick and Restless",
        "Deliverance",
        "True Trail",
        "Omega"
    };

    for (String mapName : huntersMapNames) {
      mapNameToMode.put(mapName, "hunters");
    }
    String[] invasionMapNames = {
        "A Loud Place",
        "Devolution",
        "Val Verde",
        "Bots Attack!",
        "Brawl of the Worlds",
        "The Bot",
        "Departure",
        "Trials and Tribulations"
    };
    for (String mapName : invasionMapNames) {
      mapNameToMode.put(mapName, "invasion");
    }

  }

  @GetMapping("/api/events/rotation")
  public EventInfo[] getEventsRotation() {
    logger.info("/api/events/rotation called");
    return eventInfos;
  }

  @Scheduled(fixedDelay = 60_000)
  public void updateEvents() {
    EventInfo[] eventInfos = null;
    try {
      eventInfos = brawlStarsAPI.getEventsRotation();
      List<String> yearMonth = new ArrayList<>();
      LocalDate today = LocalDate.now();
      DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMM");

      for (int i = 0; i < 3; i++) {
        String iMonthsAgo = today.minusMonths(i).format(format);
        yearMonth.add(iMonthsAgo);
      }
      // Temp code unknown -> invasion or hunters
      for (EventInfo eventInfo : eventInfos) {
        String mode = eventInfo.getEvent().getMode();
        String map = eventInfo.getEvent().getMap();
        if ("unknown".equals(mode)) {
          eventInfo.getEvent().setMode(mapNameToMode.getOrDefault(map, "unknown"));
        }
      }

      for (EventInfo eventInfo : eventInfos) {
        String mode = eventInfo.getEvent().getMode();

        List<RecordResultDto> statistics = statisticsService.getStatsFromCache(mode,
            eventInfo.getEvent().getMap(), yearMonth).getRecordResultDtos();
        gameMapService.updateTime(mode, eventInfo.getEvent().getMap(), eventInfo.getStartTime(),
            eventInfo.getEndTime());
        eventInfo.setStatistics(statistics);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    if (eventInfos != null) {
      this.eventInfos = eventInfos;
    }
  }
}
