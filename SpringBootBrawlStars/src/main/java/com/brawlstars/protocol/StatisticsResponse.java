package com.brawlstars.protocol;

import com.brawlstars.repository.RecordResultDto;
import java.util.List;

public class StatisticsResponse {

  private long updated;
  private List<RecordResultDto> recordResultDtos;
  private List<String> yearMonths;

  public long getUpdated() {
    return updated;
  }

  public void setUpdated(long updated) {
    this.updated = updated;
  }

  public List<RecordResultDto> getRecordResultDtos() {
    return recordResultDtos;
  }

  public void setRecordResultDtos(
      List<RecordResultDto> recordResultDtos) {
    this.recordResultDtos = recordResultDtos;
  }

  public List<String> getYearMonths() {
    return yearMonths;
  }

  public void setYearMonths(List<String> yearMonths) {
    this.yearMonths = yearMonths;
  }
}
