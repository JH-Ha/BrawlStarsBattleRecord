package com.brawlstars.util;

import java.util.Set;

public class CommonUtil {

  private static final Set<String> TRIO_SET = Set.of("gemGrab", "brawlBall", "heist", "bounty",
      "siege", "hotZone", "knockout", "basketBrawl", "volleyBrawl", "holdTheTrophy",
      "trophyThieves", "wipeout", "payload", "invasion");
  private static final Set<String> SOLO_SET = Set.of("soloShowdown", "hunters", "takedown",
      "trophyEscape");
  private static final Set<String> PENTA_SET = Set.of("gemGrab5V5","brawlBall5V5", "heist5V5", "bounty5V5", "hotZone5V5","knockout5V5");

  public static boolean isTrioMode(String mode) {
    if (mode == null) {
      return false;
    }
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
    if (mode == null) {
      return false;
    }
    return SOLO_SET.contains(mode);
  }

  public static boolean isPentaMode(String mode) {
    if (mode == null) {
      return false;
    }
    return PENTA_SET.contains(mode);
  }

}
