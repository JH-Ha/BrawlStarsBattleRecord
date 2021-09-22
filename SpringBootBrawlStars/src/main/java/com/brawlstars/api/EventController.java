package com.brawlstars.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.brawlstars.json.EventInfo;

@Controller
public class EventController {
	
	@Autowired
	BrawlStarsAPI brawlStarsAPI;

	@GetMapping("/api/events/rotation")
	public EventInfo[] getEventsRotation(){
		EventInfo[] eventInfos = null;
		try {
			eventInfos = brawlStarsAPI.getEventsRotation();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return eventInfos;
	}
}
