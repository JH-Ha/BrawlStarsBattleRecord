package com.brawlstars.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type")
@Getter
@Setter
public class Record {

	@Id
	@GeneratedValue
	@Column(name = "record_id")
	private Long id;

	private Date battleTime;
	private String brawlerName;
	private Integer thophies;
	private Integer trophyChange;
	private String map;
	private String key;

	private String mode;
}