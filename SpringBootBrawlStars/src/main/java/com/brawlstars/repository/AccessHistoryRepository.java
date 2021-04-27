package com.brawlstars.repository;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.AccessHistory;

@Repository
public class AccessHistoryRepository {
	@Autowired
	private EntityManager em;
	public void saveAccessHistory(AccessHistory accessHistory) {
		// TODO Auto-generated method stub
		if(accessHistory.getId() == null) {
			em.persist(accessHistory);
		}else {
			em.merge(accessHistory);
		}
	}
}
