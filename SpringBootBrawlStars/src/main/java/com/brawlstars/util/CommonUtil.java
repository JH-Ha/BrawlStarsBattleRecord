package com.brawlstars.util;

public class CommonUtil {

  public static boolean isTrioMode(String mode) {
    return "gemGrab".equals(mode) || "brawlBall".equals(mode) || "heist".equals(mode)
        || "bounty".equals(mode)
        || "siege".equals(mode) || "hotZone".equals(mode) || "knockout".equals(mode)
        || "basketBrawl".equals(mode) || "volleyBrawl".equals(mode) || "holdTheTrophy".equals(mode)
        || "trophyThieves".equals(mode) || "wipeout".equals(mode) || "payload".equals(mode)
        || "invasion".equals(mode);
  }

  public static boolean isDuoShowdown(String mode) {
    return "duoShowdown".equals(mode);
  }

  public static boolean isDuels(String mode) {
    return "duels".equals(mode);
  }

  public static boolean isAll(String mode) {
    return "ALL".equals(mode);
  }

  public static boolean isBigGame(String mode) {
    return "bigGame".equals(mode);
  }

  public static boolean isSolo(String mode) {
    return "soloShowdown".equals(mode) || "hunters".equals(mode) || "takedown".equals(mode);
  }

}
