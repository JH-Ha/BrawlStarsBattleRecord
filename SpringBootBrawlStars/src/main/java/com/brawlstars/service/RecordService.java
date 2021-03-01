package com.brawlstars.service;

import org.springframework.stereotype.Service;

@Service
public class RecordService {

	public String getOppositeResult(String result) {
		if ("defeat".equals(result)) {
			return "victory";
		} else if ("victory".equals(result)) {
			return "defeat";
		}
		return result;
	}

	public boolean isTrioMode(String mode) {
		return "gemGrab".equals(mode) || "brawlBall".equals(mode) || "heist".equals(mode) || "bounty".equals(mode)
				|| "siege".equals(mode) || "hotZone".equals(mode);
	}
}
