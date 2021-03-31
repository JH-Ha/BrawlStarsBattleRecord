package com.brawlstars.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.domain.Member;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;

@Service
@Transactional
public class MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	public void save(Member member) {
		memberRepository.save(member);
	}
	
	public Page<MemberDto> getMembers(String name, Pageable pageable){
		return memberRepository.findAll(name,pageable);
	}
	
	public MemberDto getMemberByTag(String tag) {
		return memberRepository.findMemberByTag(tag);
		}
}
