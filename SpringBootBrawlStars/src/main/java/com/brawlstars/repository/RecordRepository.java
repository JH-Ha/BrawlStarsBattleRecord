package com.brawlstars.repository;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.QRecord;
import com.brawlstars.domain.Record;
import com.querydsl.jpa.impl.JPAQuery;

@Repository
@Transactional
public class RecordRepository {
	
	@Autowired
	private EntityManager em;

	public void save(Record record) {
		if (record.getId() == null) {
			em.persist(record);
		} else {
			em.merge(record);
		}
	}

	public Record findOne(String tag, Date battleTime) {
		JPAQuery<Record> query = new JPAQuery<Record>(em);
		QRecord qRecord = QRecord.record;
		Record record = query
				.from(qRecord)
				.where(qRecord.tag.eq(tag)
				  .and(qRecord.battleTime.eq(battleTime)))
				.fetchOne();
		return record;

	}
}
