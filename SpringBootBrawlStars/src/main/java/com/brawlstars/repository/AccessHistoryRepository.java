package com.brawlstars.repository;

import com.brawlstars.domain.AccessHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessHistoryRepository extends JpaRepository<AccessHistory, Long> {

}
