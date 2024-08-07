package com.brawlstars.service;

import com.brawlstars.domain.AccessHistory;
import com.brawlstars.repository.AccessHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccessHistoryService {
    @Autowired
    public AccessHistoryRepository accessHistoryRepository;

    public void saveAccessHistory(AccessHistory accessHistory) {
        accessHistoryRepository.save(accessHistory);
    }
}
