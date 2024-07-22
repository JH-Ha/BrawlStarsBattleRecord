package com.brawlstars;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.service.MemberService;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MemberServiceTest {
    @Autowired
    MemberService memberService;
    @Autowired
    RecordService recordService;

    @BeforeEach
    public void init() throws IOException {
        String tag = "#9QU209UYC";

        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        String jsonPath = classloader.getResource("sampleResponse.json").getPath();
        String jsonStr = new String(Files.readAllBytes(Paths.get(jsonPath)));

        ObjectMapper mapper = new ObjectMapper().configure(
                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        BattleLog battleLog = mapper.readValue(jsonStr, BattleLog.class);
        List<Item> items = battleLog.getItems();
        recordService.saveBattleLog(items, tag);
        recordService.savePlayersInItems(items);
    }

    @Test
    public void testGetMemberByTag() {
        // Given
        String tag = "#9QU209UYC";
        String name = "폼폼";

        // When
        MemberDto foundMember = memberService.getMemberByTag(tag);

        // Then
        assertThat(foundMember.getName()).isEqualTo(name);
    }

    @Test
    public void testGetMembers() {
        // Given
        PageRequest pageRequest = PageRequest.of(0, 10);

        // When
        Page<MemberDto> members = memberService.getMembers("", pageRequest);

        // Then
        assertThat(members.getSize()).isEqualTo(10);
    }

}
