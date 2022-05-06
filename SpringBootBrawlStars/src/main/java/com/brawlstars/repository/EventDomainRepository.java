package com.brawlstars.repository;

import com.brawlstars.domain.EventDomain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventDomainRepository extends JpaRepository<EventDomain, Long> {

  EventDomain findByEventId(String eventId);

}
