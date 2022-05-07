package com.brawlstars.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.domain.Member;
import com.brawlstars.json.playerInfo.PlayerInfo;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.ResultDto;

@Service
@Transactional
public class MemberService {

  @Autowired
  MemberRepository memberRepository;

  @Autowired
  BrawlStarsAPI brawlStarsAPI;

  public void save(Member member) {
    memberRepository.save(member);
  }

  public Page<MemberDto> getMembers(String name, Pageable pageable) {
    return memberRepository.findAll(name, pageable);
  }

  public MemberDto getMemberByTag(String tag) {
    return memberRepository.findMemberByTag(tag);
  }

  public ResultDto saveMember(String tag) {
    ResultDto resultDto = new ResultDto();
    // check if a member already exists in DB
    MemberDto memberDto = getMemberByTag(tag);
    if (memberDto != null) {
      resultDto.setMsg("already registered");
      return resultDto;
    }

    // check if the tag is valid
    PlayerInfo playerInfo = null;
    try {
      playerInfo = brawlStarsAPI.getPlayerInfo(tag);
    } catch (Exception e) {
      e.printStackTrace();
    }
    if (playerInfo == null) {
      resultDto.setMsg("invalid tag");
      return resultDto;
    }
    Member member = new Member();
    member.setTag(tag);
    member.setName(playerInfo.getName());
    memberRepository.save(member);

    resultDto.setResult(true);
    return resultDto;
  }

  public long updateIsDeletedByTag(String tag){
    return memberRepository.updateIsDeletedByTag(tag);
  }
}
