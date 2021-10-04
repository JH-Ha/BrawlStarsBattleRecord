package com.brawlstars.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameMapDto {
	private String name;
	private String mode;
	public GameMapDto(String name, String mode) {
		this.name = name;
		this.mode = mode;
	}
	public GameMapDto(String mode) {
		this.mode = mode;
	}
}
