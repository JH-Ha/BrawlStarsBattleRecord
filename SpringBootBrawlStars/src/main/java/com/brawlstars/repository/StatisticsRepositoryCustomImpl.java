package com.brawlstars.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.brawlstars.domain.QStatistics.statistics;

public class StatisticsRepositoryCustomImpl implements StatisticsRepositoryCustom {

    @Autowired
    JPAQueryFactory queryFactory;

    public List<RecordResultDto> getTrioStatByListYearMonth(String mode,
                                                            @Nullable String map, @Nullable List<String> yearMonth) {

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(statistics.mode.eq(mode));

        if (yearMonth != null && !yearMonth.isEmpty()) {
            builder.and(statistics.statsYearMonth.in(yearMonth));
        }

        if (StringUtils.hasText(map)) {
            builder.and(statistics.map.eq(map));
        }

        return queryFactory.select(
                        Projections.constructor(RecordResultDto.class,
                                statistics.brawlerName,
                                statistics.result,
                                statistics.cnt.sum()))
                .from(statistics)
                .where(builder)
                .groupBy(statistics.brawlerName, statistics.result).fetch();
    }

    public List<RecordResultDto> getDuoSoloStatByListYearMonth(String mode,
                                                               @Nullable String map, @Nullable List<String> yearMonth) {

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(statistics.mode.eq(mode));

        if (yearMonth != null && !yearMonth.isEmpty()) {
            builder.and(statistics.statsYearMonth.in(yearMonth));
        }

        if (StringUtils.hasText(map)) {
            builder.and(statistics.map.eq(map));
        }

        return queryFactory.select(
                        Projections.constructor(RecordResultDto.class, statistics.brawlerName,
                                statistics.rankSum.sum(),
                                statistics.cnt.sum()))
                .from(statistics)
                .where(builder)
                .groupBy(statistics.brawlerName)
                .fetch();
    }
}