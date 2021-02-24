package com.brawlstars.json;

import java.util.List;

import lombok.Data;

@Data
public class Battle {
	String mode;
	String type;
	String result;
	Integer duration;
	Integer trophyChange;
	Player starPlayer;
	List<List<Player>> teams;

	// solo, duoShodown
	Integer rank;
	List<Player> players;
}
