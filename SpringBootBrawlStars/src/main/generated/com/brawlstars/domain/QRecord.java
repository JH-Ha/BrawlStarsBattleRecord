package com.brawlstars.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRecord is a Querydsl query type for Record
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRecord extends EntityPathBase<Record> {

    private static final long serialVersionUID = -57355403L;

    public static final QRecord record = new QRecord("record");

    public final DateTimePath<java.util.Date> battleTime = createDateTime("battleTime", java.util.Date.class);

    public final StringPath brawlerName = createString("brawlerName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath key = createString("key");

    public final StringPath map = createString("map");

    public final StringPath mode = createString("mode");

    public final NumberPath<Integer> thophies = createNumber("thophies", Integer.class);

    public final NumberPath<Integer> trophyChange = createNumber("trophyChange", Integer.class);

    public QRecord(String variable) {
        super(Record.class, forVariable(variable));
    }

    public QRecord(Path<? extends Record> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRecord(PathMetadata metadata) {
        super(Record.class, metadata);
    }

}

