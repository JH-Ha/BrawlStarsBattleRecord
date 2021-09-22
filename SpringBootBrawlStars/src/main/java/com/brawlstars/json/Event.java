package com.brawlstars.json;

import java.util.List;

import lombok.Data;

@Data
public class Event {
	String id;
	String mode;
	String map;
	List<String> modifiers;
}
