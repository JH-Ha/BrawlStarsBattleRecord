package com.brawlstars.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.repository.MemberRepository;

@Service
@Transactional
public class MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	
}
