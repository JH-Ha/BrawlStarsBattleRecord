package com.brawlstars.util;

import java.util.Set;

public class CommonUtil {

  private static final Set<String> TRIO_SET = Set.of("gemGrab", "brawlBall", "heist", "bounty",
      "siege", "hotZone", "knockout", "basketBrawl", "volleyBrawl", "holdTheTrophy",
      "trophyThieves", "wipeout", "payload", "invasion");
  private static final Set<String> SOLO_SET = Set.of("soloShowdown", "hunters", "takedown",
      "trophyEscape");

  public static boolean isTrioMode(String mode) {
    return TRIO_SET.contains(mode);
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
    return SOLO_SET.contains(mode);
  }

}
