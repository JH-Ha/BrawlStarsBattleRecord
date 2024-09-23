package com.brawlstars.repository;

import org.springframework.lang.Nullable;

import java.util.List;

public interface StatisticsRepositoryCustom {
    List<RecordResultDto> getTrioStatByListYearMonth(String mode, @Nullable String map,
                                                     @Nullable List<String> yearMonth);

    List<RecordResultDto> getDuoSoloStatByListYearMonth(String mode, @Nullable String map,
                                                        @Nullable List<String> yearMonth);
}
