package com.brawlstars.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.brawlstars.domain.Member;
import com.brawlstars.domain.QMember;
import com.querydsl.jpa.impl.JPAQuery;

@Repository
@Transactional
public class MemberRepository {
	@Autowired
	private EntityManager em;

	public void save(Member member) {
		if (member.getId() == null) {
			em.persist(member);
		} else {
			em.merge(member);
		}
	}

	public Member findOne(String tag) {
		JPAQuery<Member> query = new JPAQuery<Member>(em);
		QMember qMember = QMember.member;
		Member member = query
				.from(qMember)
				.where(qMember.tag.eq(tag))
				.fetchOne();
		return member;
	}
	public List<Member> findAll(){
		JPAQuery<Member> query = new JPAQuery<Member>(em);
		QMember qMember = QMember.member;
		List<Member> members = query
				.from(qMember)
				.fetch();
		return members;
	}
}
