package com.brawlstars.service;

import com.brawlstars.domain.EventDomain;
import com.brawlstars.json.EventInfo;
import com.brawlstars.repository.EventDomainRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EventDomainService {

  @Autowired
  EventDomainRepository eventDomainRepository;

  public EventDomain findById(String eventId) {
    return eventDomainRepository.findByEventId(eventId);
  }

  public EventDomain save(EventInfo eventInfo) {
    String eventId = eventInfo.getEvent().getId();
    String mode = eventInfo.getEvent().getMode();
    String map = eventInfo.getEvent().getMode();

    EventDomain eventDomain = new EventDomain();
    eventDomain.setEventId(eventId);
    eventDomain.setMode(mode);
    eventDomain.setMap(map);

    return eventDomainRepository.save(eventDomain);
  }

}
