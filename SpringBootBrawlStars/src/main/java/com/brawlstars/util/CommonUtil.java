package com.brawlstars.util;

public class CommonUtil {
	public static boolean isTrioMode(String mode) {
		return "gemGrab".equals(mode) || "brawlBall".equals(mode) || "heist".equals(mode) || "bounty".equals(mode)
				|| "siege".equals(mode) || "hotZone".equals(mode) || "knockout".equals(mode) || "basketBrawl".equals(mode)
				|| "volleyBrawl".equals(mode) || "holdTheTrophy".equals(mode) || "trophyThieves".equals(mode);
	}

	public static boolean isDuo(String mode) {
		// TODO Auto-generated method stub
		return "duoShowdown".equals(mode);
	}
	public static boolean isAll(String mode) {
		return "ALL".equals(mode);
	}
	public static boolean isBigGame(String mode) {
		if ("bigGame".equals(mode)) {
			return true;
		}
		return false;
	}

	public static boolean isSolo(String mode) {
		if ("soloShowdown".equals(mode)) {
			return true;
		}
		return false;
	}

}
