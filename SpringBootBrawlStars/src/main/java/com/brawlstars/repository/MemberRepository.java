package com.brawlstars.repository;

import com.brawlstars.domain.Member;
import com.brawlstars.domain.QMember;
import com.querydsl.core.BooleanBuilder;
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
public class MemberRepository {

    @Autowired
    private EntityManager em;

    @Autowired
    JPAQueryFactory queryFactory;

    QMember qMember = QMember.member;


    public void save(Member member) {
        if (member.getId() == null) {
            em.persist(member);
        } else {
            em.merge(member);
        }
    }

    public List<String> findTags() {
        List<String> tags = queryFactory
                .select(qMember.tag)
                .from(qMember)
                .where(qMember.isDeleted.eq(false))
                .fetch();
        return tags;
    }

    public long updateIsDeletedByTag(String tag) {
        return queryFactory.update(qMember)
                .set(qMember.isDeleted, true)
                .where(qMember.tag.eq(tag))
                .execute();
    }

    public Page<MemberDto> findAll(String name, Pageable pageable) {

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(qMember.isDeleted.eq(false));

        if (StringUtils.hasText(name)) {
            builder.and(qMember.name.contains(name));
        }

        List<Member> result = queryFactory.selectFrom(qMember)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long totalMember = queryFactory.select(qMember.count())
                .from(qMember)
                .where(builder)
                .fetchOne();

        return new PageImpl<>(
                result.stream().map(member -> new MemberDto(member))
                        .collect(Collectors.toList()),
                pageable, totalMember);

    }

    public MemberDto findMemberByTag(String tag) {

        MemberDto memberDto = queryFactory
                .select(Projections.constructor(MemberDto.class,
                        qMember.tag,
                        qMember.name))
                .from(qMember)
                .where(qMember.tag.eq(tag))
                .fetchFirst();

        return memberDto;
    }
}
