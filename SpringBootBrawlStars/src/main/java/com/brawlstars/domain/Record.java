package com.brawlstars.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "game_type")
@Getter
@Setter
@Table(uniqueConstraints = { @UniqueConstraint(name = "uniqueGame", columnNames = { "tag", "battleTime" }) })

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
	
	private String playerName;

	// @Column(name = "group_key", insertable = false, updatable = false)
	// private String groupKey;
	private String mode;
	private String type;

	//Trio
	private Integer duration;
	private Boolean isStarPlayer;
	private String result;
	
	//duo, solo
	private Integer resultRank;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_key")
	private Record parent;

	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	private List<Record> groupRecords = new ArrayList<>();

	public static void setRelation(Record parent, List<Record> groupRecords) {
		parent.setGroupRecords(groupRecords);
		groupRecords.stream().forEach(gr -> {
			gr.setParent(parent);
		});
	}
}
