package com.brawlstars.json;

import lombok.Data;

import java.util.List;

@Data
public class Event {
    String id;
    String mode;
    String map;
    List<String> modifiers;
}
