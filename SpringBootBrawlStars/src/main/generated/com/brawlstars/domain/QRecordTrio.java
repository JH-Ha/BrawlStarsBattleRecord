package com.brawlstars.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRecordTrio is a Querydsl query type for RecordTrio
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRecordTrio extends EntityPathBase<RecordTrio> {

    private static final long serialVersionUID = 915142969L;

    public static final QRecordTrio recordTrio = new QRecordTrio("recordTrio");

    public final QRecord _super = new QRecord(this);

    //inherited
    public final DateTimePath<java.util.Date> battleTime = _super.battleTime;

    //inherited
    public final StringPath brawlerName = _super.brawlerName;

    public final NumberPath<Integer> duration = createNumber("duration", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final BooleanPath isStarPlayer = createBoolean("isStarPlayer");

    //inherited
    public final StringPath key = _super.key;

    //inherited
    public final StringPath map = _super.map;

    //inherited
    public final StringPath mode = _super.mode;

    //inherited
    public final NumberPath<Integer> thophies = _super.thophies;

    //inherited
    public final NumberPath<Integer> trophyChange = _super.trophyChange;

    public QRecordTrio(String variable) {
        super(RecordTrio.class, forVariable(variable));
    }

    public QRecordTrio(Path<? extends RecordTrio> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRecordTrio(PathMetadata metadata) {
        super(RecordTrio.class, metadata);
    }

}
