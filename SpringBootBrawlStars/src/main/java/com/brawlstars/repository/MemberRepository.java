package com.brawlstars.repository;

import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.brawlstars.domain.Member;
import com.brawlstars.domain.QMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class MemberRepository {
	@Autowired
	private EntityManager em;
	
	@Autowired
	JPAQueryFactory queryFactory;

	public void save(Member member) {
		if (member.getId() == null) {
			em.persist(member);
		} else {
			em.merge(member);
		}
	}

	public Page<MemberDto> findAll(String name, Pageable pageable) {
		JPAQuery<Member> query = new JPAQuery<Member>(em);
		QMember qMember = QMember.member;
		
		BooleanBuilder builder = new BooleanBuilder();
		
		builder.and(qMember.isDeleted.eq(false));
		
		if(StringUtils.hasText(name)) {
			builder.and(qMember.name.contains(name));
		}
		
		QueryResults<Member> result = query.from(qMember)
				.where(builder)
				.offset(pageable.getOffset()).limit(pageable.getPageSize())
				.fetchResults();
		
		return new PageImpl<>(
				result.getResults().stream().map(member -> new MemberDto(member)).collect(Collectors.toList()),
				pageable, result.getTotal());
		
	}

	public MemberDto findMemberByTag(String tag) {
		
		QMember qMember = QMember.member;
		
		MemberDto memberDto = queryFactory.select(Projections.constructor(MemberDto.class, qMember.tag, qMember.name))
				.from(qMember)
				.where(qMember.tag.eq(tag))
				.fetchFirst();
					
		return memberDto;
	}
}
