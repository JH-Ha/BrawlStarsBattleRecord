package com.brawlstars.repository;

import com.brawlstars.domain.QRecord;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordSearch;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RecordRepository {

    @Autowired
    JPAQueryFactory queryFactory;
    QRecord qRecord = QRecord.record;
    @Autowired
    private EntityManager em;

    public void save(Record record) {
        if (record.getId() == null) {
            em.persist(record);
        } else {
            em.merge(record);
        }
    }

    public List<Record> findByTagAndBattleTime(String tag, String battleTime) {
        List<Record> records = queryFactory.selectFrom(qRecord)
                .where(qRecord.tag.eq(tag)
                        , qRecord.battleTime.eq(battleTime))
                .fetch();
        return records;
    }

    public List<Long> findIdsByTagAndBattleTime(String tag, String battleTime) {
        List<Long> ids = queryFactory.select(qRecord.id)
                .from(qRecord)
                .where(qRecord.tag.eq(tag)
                        , qRecord.battleTime.eq(battleTime))
                .fetch();
        return ids;
    }

    public Record findOne(String tag, String battleTime, String brawlerName) {
        Record record = queryFactory.selectFrom(qRecord)
                .where(qRecord.tag.eq(tag)
                        , qRecord.battleTime.eq(battleTime)
                        , qRecord.brawlerName.eq(brawlerName))
                .fetchOne();
        return record;
    }

    public List<Record> findDuelRecords(String tag, String battleTime) {
        List<Record> records = queryFactory.selectFrom(qRecord)
                .where(qRecord.tag.eq(tag)
                        , qRecord.battleTime.eq(battleTime))
                .fetch();
        return records;
    }

    public Page<RecordDto> findByTag(String tag, Pageable pageable, RecordSearch recordSearch) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(qRecord.tag.eq(tag));
        if (StringUtils.hasText(recordSearch.getBrawlerName())) {
            builder.and(qRecord.brawlerName.eq(recordSearch.getBrawlerName()));
        }
        if (StringUtils.hasText(recordSearch.getMode())) {
            builder.and(qRecord.mode.eq(recordSearch.getMode()));
        }

        List<Tuple> groupKeys = queryFactory
                .select(qRecord.parent.id, qRecord.battleTime)
                .distinct() // to distinguish duels
                .from(qRecord)
                .where(builder)
                .orderBy(qRecord.battleTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long totalCnt = queryFactory
                .select(qRecord.parent.id.countDistinct()) // to distinguish duels
                .from(qRecord)
                .where(builder)
                .fetchOne();

        QRecord qRecordParent = new QRecord("parent");

        List<Record> result = queryFactory
                .selectFrom(qRecord)
                .leftJoin(qRecord.groupRecords, qRecordParent)
                .fetchJoin()
                .where(qRecord.id.in(
                        groupKeys.stream()
                                .map(tuple -> tuple.get(0, Long.class))
                                .collect(Collectors.toList())))
                .orderBy(qRecord.battleTime.desc())
                .distinct()
                .fetch();

        return new PageImpl<>(result.stream()
                .map(RecordDto::new)
                .collect(Collectors.toList()),
                pageable,
                totalCnt);

    }

    public long removeByTag(String tag) {
        long result = queryFactory.delete(qRecord).where(qRecord.tag.eq(tag)).execute();
        return result;
    }

    public List<RecordResultDto> findByMap(RecordSearch recordSearch) {
        BooleanBuilder builder = new BooleanBuilder();
        String map = recordSearch.getMap();
        String mode = recordSearch.getMode();

        if (StringUtils.hasText(map)) {
            builder.and(qRecord.map.eq(map));
        }
        if (StringUtils.hasText(mode)) {
            builder.and(qRecord.mode.eq(recordSearch.getMode()));
        }

        if (StringUtils.hasText(recordSearch.getTrophyRange())) {
            // To avoid counting plays with AI
            final int baseRank = 550;
            String trophyRange = recordSearch.getTrophyRange();
            switch (trophyRange) {
                case "lowRank":
                    builder.and(qRecord.trophies.lt(baseRank));
                    break;
                case "highRank":
                    builder.and(qRecord.trophies.gt(baseRank)
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
        List<GameMapDto> gameMapDtos =
                queryFactory.select(Projections.constructor(GameMapDto.class
                                , qRecord.mode))
                        .from(qRecord)
                        .distinct()
                        .fetch();
        return gameMapDtos;
    }

    public List<RecordResultDto> findSoloDuoByMap(RecordSearch recordSearch) {
        BooleanBuilder builder = new BooleanBuilder();
        String mode = recordSearch.getMode();
        String map = recordSearch.getMap();
        if (StringUtils.hasText(map)) {
            builder.and(qRecord.map.eq(map));
        }
        if (StringUtils.hasText(mode)) {
            builder.and(qRecord.mode.eq(mode));
        }

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

    public void deleteOldRecords(String tag, Long offset) {
        List<Long> groupIds = queryFactory.select(qRecord.parent.id)
                .from(qRecord)
                .where(qRecord.tag.eq(tag))
                .orderBy(qRecord.battleTime.desc())
                .offset(offset)
                .fetch();

        queryFactory.delete(qRecord)
                .where(qRecord.parent.id.in(groupIds))
                .execute();

    }

    public Long updateStatUpdated(RecordSearch recordSearch) {
        Long updatedStatCnt = queryFactory.update(qRecord)
                .where(qRecord.map.eq(recordSearch.getMap())
                        .and(qRecord.mode.eq(recordSearch.getMode())
                                .and(qRecord.statUpdated.eq(false))))
                .set(qRecord.statUpdated, true)
                .execute();
        return updatedStatCnt;
    }

    public long getRecordCount() {
        return queryFactory.select(qRecord)
                .from(qRecord)
                .fetch()
                .size();
    }

    public long deleteAllRecord() {
        return queryFactory.delete(qRecord).execute();
    }
}
