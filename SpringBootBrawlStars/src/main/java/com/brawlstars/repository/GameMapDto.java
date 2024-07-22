package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameMapDto {
    private String name;
    private String mode;
    private String startTime;
    private String endTime;

    public GameMapDto(String name, String mode, String startTime, String endTime) {
        this.name = name;
        this.mode = mode;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public GameMapDto(String name, String mode) {
        this.name = name;
        this.mode = mode;
    }

    public GameMapDto(String mode) {
        this.mode = mode;
    }
}
