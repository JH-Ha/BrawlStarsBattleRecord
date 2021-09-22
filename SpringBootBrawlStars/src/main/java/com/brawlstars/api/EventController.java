package com.brawlstars.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.brawlstars.json.EventInfoContainer;

@Controller
public class EventController {

	@GetMapping("/api/events/rotation")
	public EventInfoContainer getEventsRotation(){
		return null;
	}
}
