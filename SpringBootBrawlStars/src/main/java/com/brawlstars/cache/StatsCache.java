package com.brawlstars.cache;

import com.brawlstars.repository.RecordResultDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class StatsCache {
    private long updated;
    private List<RecordResultDto> recordResultDtos;
}