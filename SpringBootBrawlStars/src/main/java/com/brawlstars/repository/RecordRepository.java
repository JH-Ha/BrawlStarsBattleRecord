package com.brawlstars.repository;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.brawlstars.domain.QRecord;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordSearch;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
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
	
	public Page<RecordDto> findByTag(String tag, Pageable pageable, RecordSearch recordSearch) {
		QRecord qRecord = QRecord.record;

		BooleanBuilder builder = new BooleanBuilder();
		
		builder.and(qRecord.tag.eq(tag));
		if(StringUtils.hasText(recordSearch.getBrawlerName())) {
			builder.and(qRecord.brawlerName.eq(recordSearch.getBrawlerName()));
		}
		if(StringUtils.hasText(recordSearch.getMode())) {
			builder.and(qRecord.mode.eq(recordSearch.getMode()));
		}
		
		// QRecord qRecordGroup = QRecord.record;
		QueryResults<Long> groupKeys = queryFactory
				.select(qRecord.parent.id)
				.from(qRecord)
				.where(builder)
				.orderBy(qRecord.battleTime.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetchResults();
		
		QueryResults<Record> result = queryFactory
				.selectFrom(qRecord)
				.where(qRecord.id.in(groupKeys.getResults()))
				.orderBy(qRecord.battleTime.desc())
				.fetchResults();
		
		return new PageImpl<>(result.getResults().stream()
				.map(record -> new RecordDto(record))
				.collect(Collectors.toList()),
				pageable,
				groupKeys.getTotal());
		
	}

	public long removeByTag(String tag) {
		// TODO Auto-generated method stub
		QRecord qRecord = QRecord.record;
		long result = queryFactory.delete(qRecord).where(qRecord.tag.eq(tag)).execute();

		return result;
	}

	public List<RecordResultDto> findByMap(String map) {
		// TODO Auto-generated method stub
		QRecord qRecord = QRecord.record;
		List<RecordResultDto> records = 
				queryFactory.select(
						Projections.constructor(RecordResultDto.class
								, qRecord.brawlerName
								, qRecord.result
								, qRecord.count()
				))
				.from(qRecord)
				.where(qRecord.map.eq(map))
				.groupBy(qRecord.brawlerName
						,qRecord.result)
				.fetch();
		return records;
	}
	
	public List<GameMapDto> getDistinctGameMaps() {
		// TODO Auto-generated method stub
		QRecord qRecord = QRecord.record;
		List<GameMapDto> gameMapDtos = 
				queryFactory.select(Projections.constructor(GameMapDto.class
						, qRecord.map
						, qRecord.mode))
				.from(qRecord)
				.distinct()
				.fetch();
		return gameMapDtos;
	}
}
