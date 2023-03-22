package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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
	@ColumnDefault("false")
	private boolean isDeleted;
	private String startTime;
	private String endTime;
}
