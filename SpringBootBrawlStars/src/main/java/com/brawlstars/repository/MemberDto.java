package com.brawlstars.repository;

import com.brawlstars.domain.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
    private String tag;
    private String name;

    public MemberDto(String tag, String name) {
        this.tag = tag;
        this.name = name;
    }

    public MemberDto() {

    }

    public MemberDto(Member member) {
        tag = member.getTag();
        name = member.getName();
    }

}
