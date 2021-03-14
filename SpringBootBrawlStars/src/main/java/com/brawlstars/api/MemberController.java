package com.brawlstars.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.repository.MemberDto;
import com.brawlstars.service.MemberService;


@RestController
public class MemberController {
	@Autowired
	MemberService memberService;
	@GetMapping("/member")
	@CrossOrigin(origins = "http://localhost:8081")
	public Page<MemberDto> getMembers(@RequestParam(defaultValue = "") String name, Pageable pageable){
		return memberService.getMembers(name,pageable);
	}
}
