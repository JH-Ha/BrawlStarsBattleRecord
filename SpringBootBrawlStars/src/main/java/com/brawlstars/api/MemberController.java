package com.brawlstars.api;

import com.brawlstars.json.playerInfo.PlayerInfo;
import com.brawlstars.remote.BrawlStarsApiService;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.ResultDto;
import com.brawlstars.service.MemberService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
public class MemberController {
    @Autowired
    MemberService memberService;
    @Autowired
    BrawlStarsApiService brawlStarsApiService;

    @GetMapping("/member")
    public Page<MemberDto> getMembers(@RequestParam(defaultValue = "") String name, Pageable pageable) {
        return memberService.getMembers(name, pageable);
    }

    @GetMapping("/member/{tag}")
    public MemberDto getMember(@PathVariable(name = "tag") String tag) {
        return memberService.getMemberByTag(tag);
    }

    @PostMapping("/member/{tag}")
    public ResultDto saveMember(@PathVariable(name = "tag") String tag) {
        return memberService.saveMember(tag);
    }

    @GetMapping("/member/api/{tag}")
    public PlayerInfoDto getMemberFromApiServer(@PathVariable(name = "tag") String tag) {
        PlayerInfo playerInfo = null;
        PlayerInfoDto playerInfoDto = new PlayerInfoDto();
        try {
            playerInfo = brawlStarsApiService.getPlayerInfo(tag);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (playerInfo != null) {
            playerInfoDto.setFound(true);
            playerInfoDto.setPlayerInfo(playerInfo);
        }
        return playerInfoDto;
    }


}


@Getter
@Setter
class PlayerInfoDto {
    private boolean found;
    private PlayerInfo playerInfo;

    public PlayerInfoDto() {
        this.found = false;
        this.playerInfo = null;
    }
}