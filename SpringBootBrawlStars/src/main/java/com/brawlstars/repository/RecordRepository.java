package com.brawlstars.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.QRecord;
import com.brawlstars.domain.Record;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class RecordRepository {

	@Autowired
	private EntityManager em;

	@Autowired
	JPAQueryFactory queryFactory;

	public void save(Record record) {
		if (record.getId() == null) {
			em.persist(record);
		} else {
			em.merge(record);
		}
	}

	public Record findOne(String tag, String battleTime) {
		// JPAQuery<Record> query = new JPAQuery<Record>(em);
		QRecord qRecord = QRecord.record;
		Record record = queryFactory.selectFrom(qRecord)
				.where(qRecord.tag.eq(tag).and(qRecord.battleTime.eq(battleTime))).fetchOne();
		return record;

	}

	public List<Record> findByTag(String tag) {
		QRecord qRecord = QRecord.record;

		// QRecord qRecordGroup = QRecord.record;
		List<Record> records = queryFactory.selectFrom(qRecord).where(
				// qRecord.parent.eq(qRecordGroup.parent).and(
				qRecord.tag.eq(tag)
		// )
		).fetch();
		return records;
	}

	public long removeByTag(String tag) {
		// TODO Auto-generated method stub
		QRecord qRecord = QRecord.record;
		long result = queryFactory.delete(qRecord).where(qRecord.tag.eq(tag)).execute();

		return result;
	}
}
