package com.brawlstars.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.json.playerInfo.PlayerInfo;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.service.MemberService;

import lombok.Getter;
import lombok.Setter;


@RestController
@CrossOrigin(origins = {"http://localhost:8081", "http://www.brawlstat.xyz","http://www.brawlstat.xyz:8080"})
public class MemberController {
	@Autowired
	MemberService memberService;
	@Autowired
	BrawlStarsAPI brawlStarsAPI;
	
	@GetMapping("/member")	
	public Page<MemberDto> getMembers(@RequestParam(defaultValue = "") String name, Pageable pageable){
		return memberService.getMembers(name,pageable);
	}
	
	@GetMapping("/member/{tag}")
	public MemberDto getMember(@PathVariable(name = "tag") String tag) {
		return memberService.getMemberByTag(tag);
	}
	
	@GetMapping("/v1/member/api/{tag}")
	public PlayerInfoDto getMemberFromApiServer(@PathVariable(name = "tag") String tag) {
		PlayerInfo playerInfo = null;
		PlayerInfoDto playerInfoDto = new PlayerInfoDto();
		try {
			playerInfo = brawlStarsAPI.getPlayerInfo(tag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(playerInfo != null) {
			playerInfoDto.setFound(true);
			playerInfoDto.setPlayerInfo(playerInfo);
		}
		return playerInfoDto;
	}
	
	
}


@Getter
@Setter
class PlayerInfoDto{
	private boolean found;
	private PlayerInfo playerInfo;
	public PlayerInfoDto() {
		this.found = false;
		this.playerInfo = null;
	}
}