package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultDto {
    Boolean result;
    String msg;

    public ResultDto() {
        this.result = false;
        this.msg = "";
    }
}
