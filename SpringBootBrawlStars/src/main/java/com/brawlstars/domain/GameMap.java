package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class GameMap {
	@Id
	@GeneratedValue
	@Column(name = "game_map_id")
	private Long id;
	String mode;
	String name;
}
