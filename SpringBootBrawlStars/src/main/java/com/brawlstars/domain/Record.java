package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type")
@Getter
@Setter
@Table(uniqueConstraints = 
{ @UniqueConstraint(
		name = "uniqueGame", 
		columnNames = { "tag", "battleTime" }) 
})

public class Record {

	@Id
	@GeneratedValue
	@Column(name = "record_id")
	private Long id;
	private String tag;
	private String battleTime;
	private String brawlerName;
	private Integer power;
	private Integer trophies;
	private Integer trophyChange;
	private String map;
	private String groupKey;
	private String mode;
	private String type;
}
