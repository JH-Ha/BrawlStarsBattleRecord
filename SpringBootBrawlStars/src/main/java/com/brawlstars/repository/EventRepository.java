package com.brawlstars.repository;

import com.brawlstars.domain.EventDomain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventDomain, Long> {

}
