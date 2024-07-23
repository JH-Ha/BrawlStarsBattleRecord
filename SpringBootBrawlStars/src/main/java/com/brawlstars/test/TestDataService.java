package com.brawlstars.test;

import com.brawlstars.schedule.RecordSchedule;
import com.brawlstars.service.MemberService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("local")
public class TestDataService {

    @Autowired
    private MemberService memberService;
    @Autowired
    private RecordSchedule recordSchedule;

    @PostConstruct
    public void postConstruct() {
        String tag = "#9QU209UYC";
        memberService.saveMember(tag);
        recordSchedule.saveRecords();
    }
}
