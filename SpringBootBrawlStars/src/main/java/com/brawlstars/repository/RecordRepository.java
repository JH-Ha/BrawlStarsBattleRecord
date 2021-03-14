package com.brawlstars.repository;

import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.QRecord;
import com.brawlstars.domain.Record;
import com.querydsl.core.QueryResults;
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

	public Page<RecordDto> findByTag(String tag, Pageable pageable) {
		QRecord qRecord = QRecord.record;

		// QRecord qRecordGroup = QRecord.record;
		QueryResults<Record> result = queryFactory.selectFrom(qRecord).where(qRecord.tag.eq(tag))
				.orderBy(qRecord.battleTime.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetchResults();
		return new PageImpl<>(result.getResults().stream()
				.map(record -> new RecordDto(record))
				.collect(Collectors.toList()),
				pageable,
				result.getTotal());
		
	}

	public long removeByTag(String tag) {
		// TODO Auto-generated method stub
		QRecord qRecord = QRecord.record;
		long result = queryFactory.delete(qRecord).where(qRecord.tag.eq(tag)).execute();

		return result;
	}
}
