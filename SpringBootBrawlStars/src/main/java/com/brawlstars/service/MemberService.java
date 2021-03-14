package com.brawlstars.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;

@Service
@Transactional
public class MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	public Page<MemberDto> getMembers(String name, Pageable pageable){
		return memberRepository.findAll(name,pageable);
	}
}
