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

    public Record findOne(String tag, String battleTime, String brawlerName) {
        QRecord qRecord = QRecord.record;
        Record record = queryFactory.selectFrom(qRecord)
                .where(qRecord.tag.eq(tag)
                        .and(qRecord.battleTime.eq(battleTime))
                        .and(qRecord.brawlerName.eq(brawlerName)))
                .fetchOne();
        return record;
    }

    public List<Record> findDuelRecords(String tag, String battleTime) {
        QRecord qRecord = QRecord.record;
        List<Record> records = queryFactory.selectFrom(qRecord)
                .where(qRecord.tag.eq(tag).and(qRecord.battleTime.eq(battleTime))).fetch();
        return records;
    }

    public Page<RecordDto> findByTag(String tag, Pageable pageable, RecordSearch recordSearch) {
        QRecord qRecord = QRecord.record;

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(qRecord.tag.eq(tag));
        if (StringUtils.hasText(recordSearch.getBrawlerName())) {
            builder.and(qRecord.brawlerName.eq(recordSearch.getBrawlerName()));
        }
        if (StringUtils.hasText(recordSearch.getMode())) {
            builder.and(qRecord.mode.eq(recordSearch.getMode()));
        }

        // QRecord qRecordGroup = QRecord.record;
        QueryResults<Long> groupKeys = queryFactory
                .select(qRecord.parent.id)
                .distinct() // to distinguish duels
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

    public List<RecordResultDto> findByMap(RecordSearch recordSearch) {

        QRecord qRecord = QRecord.record;

        BooleanBuilder builder = new BooleanBuilder();
        String map = recordSearch.getMap();
        String mode = recordSearch.getMode();

        if (StringUtils.hasText(map)) {
            builder.and(qRecord.map.eq(map));
        }
        if (StringUtils.hasText(mode)) {
            builder.and(qRecord.mode.eq(recordSearch.getMode()));
        }
//				.and(qRecord.type.eq("ranked"))


        if (StringUtils.hasText(recordSearch.getTrophyRange())) {
            String trophyRange = recordSearch.getTrophyRange();
            switch (trophyRange) {
                case "lowRank":
                    builder.and(qRecord.trophies.lt(500));
                    break;
                case "highRank":
                    builder.and(qRecord.trophies.gt(500)
                            .or(qRecord.type.eq("challenge"))
                            .or(qRecord.type.eq("soloRanked"))
                            .or(qRecord.type.eq("teamRanked")));
                    break;
            }
        }
        if (StringUtils.hasText(recordSearch.getTag())) {
            builder.and(qRecord.tag.eq(recordSearch.getTag()));
        }
        if (StringUtils.hasText(recordSearch.getStart())) {
            builder.and(qRecord.battleTime.gt(recordSearch.getStart()));
        }
        if (StringUtils.hasText(recordSearch.getEnd())) {
            builder.and(qRecord.battleTime.lt(recordSearch.getEnd()));
        }
        if (recordSearch.getStatUpdated() != null) {
            builder.and(qRecord.statUpdated.eq(recordSearch.getStatUpdated()));
        }
        List<RecordResultDto> records =
                queryFactory.select(
                                Projections.constructor(RecordResultDto.class
                                        , qRecord.brawlerName
                                        , qRecord.result
                                        , qRecord.count()
                                ))
                        .from(qRecord)
                        .where(builder)
                        .groupBy(qRecord.brawlerName
                                , qRecord.result)
                        .fetch();
        return records;
    }

    public List<GameMapDto> getDistinctGameMaps(String mode) {
        // TODO Auto-generated method stub

        QRecord qRecord = QRecord.record;

        BooleanBuilder builder = new BooleanBuilder();
        if (StringUtils.hasText(mode)) {
            builder.and(qRecord.mode.eq(mode));
        }
        List<GameMapDto> gameMapDtos =
                queryFactory.select(Projections.constructor(GameMapDto.class
                                , qRecord.map
                                , qRecord.mode))
                        .from(qRecord)
                        .where(builder)
                        .distinct()
                        .fetch();
        return gameMapDtos;
    }

    public List<GameMapDto> getDistinctModes() {
        QRecord qRecord = QRecord.record;

        List<GameMapDto> gameMapDtos =
                queryFactory.select(Projections.constructor(GameMapDto.class
                                , qRecord.mode))
                        .from(qRecord)
                        .distinct()
                        .fetch();
        return gameMapDtos;
    }

    public List<RecordResultDto> findSoloDuoByMap(RecordSearch recordSearch) {
        // TODO Auto-generated method stub
        QRecord qRecord = QRecord.record;

        BooleanBuilder builder = new BooleanBuilder();
        String mode = recordSearch.getMode();
        String map = recordSearch.getMap();
        if (StringUtils.hasText(map)) {
            builder.and(qRecord.map.eq(map));
        }
        if (StringUtils.hasText(mode)) {
            builder.and(qRecord.mode.eq(mode));
        }
//				.and(qRecord.type.eq("ranked"))
        builder.and(qRecord.mode.eq(mode));

        if (StringUtils.hasText(recordSearch.getTrophyRange())) {
            String trophyRange = recordSearch.getTrophyRange();
            switch (trophyRange) {
                case "lowRank":
                    builder.and(qRecord.trophies.lt(500));
                    break;
                case "highRank":
                    builder.and(qRecord.trophies.gt(500)
                            .or(qRecord.type.eq("challenge")));
                    break;
            }
        }
        if (StringUtils.hasText(recordSearch.getStart())) {
            builder.and(qRecord.battleTime.gt(recordSearch.getStart()));
        }
        if (StringUtils.hasText(recordSearch.getEnd())) {
            builder.and(qRecord.battleTime.lt(recordSearch.getEnd()));
        }

        if (StringUtils.hasText(recordSearch.getTag())) {
            builder.and(qRecord.tag.eq(recordSearch.getTag()));
        }
        if (recordSearch.getStatUpdated() != null) {
            builder.and(qRecord.statUpdated.eq(recordSearch.getStatUpdated()));
        }

        List<RecordResultDto> records =
                queryFactory.select(
                                Projections.constructor(RecordResultDto.class
                                        , qRecord.brawlerName
                                        , qRecord.resultRank.sum()
                                        , qRecord.count()
                                ))
                        .from(qRecord)
                        .where(builder)
                        .groupBy(qRecord.brawlerName)
                        .fetch();
        return records;
    }

    public List<RecordResultDto> findAllResult(RecordSearch recordSearch) {

        QRecord qRecord = QRecord.record;

        BooleanBuilder builder = new BooleanBuilder();

        if (StringUtils.hasText(recordSearch.getTag())) {
            builder.and(qRecord.tag.eq(recordSearch.getTag()));
        }

        List<RecordResultDto> records =
                queryFactory.select(
                                Projections.constructor(RecordResultDto.class
                                        , qRecord.brawlerName
                                        , qRecord.count()
                                ))
                        .from(qRecord)
                        .where(builder)
                        .groupBy(qRecord.brawlerName)
                        .fetch();
        return records;
    }

    public void deleteRecords() {
        // TODO Auto-generated method stub

        QRecord qRecord = QRecord.record;
        queryFactory.delete(qRecord).where(qRecord.battleTime.lt("20210513"));
    }

    public void deleteOldRecords(String tag, Long offset) {
        QRecord qRecord = QRecord.record;

        List<Record> records = queryFactory.select(qRecord)
                .from(qRecord)
                .where(qRecord.tag.eq(tag))
                .orderBy(qRecord.battleTime.desc())
                .offset(offset)
                .fetch();

//		queryFactory.delete(qRecord)
//					.where(qRecord.parent.id.in(ids))
//					.execute();
//		Long cnt = queryFactory.delete(qRecord)
//					.where(qRecord.id.in(ids))
//					.execute();
        for (Record record : records) {
            em.remove(record);
        }

    }

    public Long updateStatUpdated(RecordSearch recordSearch) {
        QRecord qRecord = QRecord.record;
        Long updatedStatCnt = queryFactory.update(qRecord)
                .where(qRecord.map.eq(recordSearch.getMap())
                        .and(qRecord.mode.eq(recordSearch.getMode())
                                .and(qRecord.statUpdated.eq(false))))
                .set(qRecord.statUpdated, true)
                .execute();
        return updatedStatCnt;
    }

    public long getRecordCount() {
        QRecord qRecord = QRecord.record;
        return queryFactory.select(qRecord)
                .from(qRecord)
                .fetchCount();
    }

    public long deleteAllRecord() {
        QRecord qRecord = QRecord.record;
        return queryFactory.delete(qRecord).execute();
    }
}
