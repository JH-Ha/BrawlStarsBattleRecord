package com.brawlstars.json;

import com.brawlstars.repository.RecordResultDto;
import lombok.Data;

import java.util.List;

@Data
public class EventInfo {
    String startTime;
    String endTime;
    Event event;

    //for frontEnd
    List<RecordResultDto> statistics;
}