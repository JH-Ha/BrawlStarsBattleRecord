package com.brawlstars.util;

public class CommonUtil {

    /**
     * event.mode takes precedence over battle.mode (they differ for cases like paintBrawl/5v5/trophyEscape),
     * but falls back to battle.mode when event.mode is missing, "unknown", or not a recognized BrawlMode
     * (e.g. an event wrapper type that hasn't been added to the enum yet).
     */
    public static String resolveMode(String eventMode, String battleMode) {
        return BrawlMode.fromValue(eventMode)
                .filter(bm -> bm != BrawlMode.UNKNOWN)
                .map(bm -> bm.value)
                .orElse(battleMode);
    }

    public static boolean isTrioMode(String mode) {
        return BrawlMode.fromValue(mode).map(BrawlMode::isTrio).orElse(false);
    }

    public static boolean isDuoShowdown(String mode) {
        return BrawlMode.DUO_SHOWDOWN.value.equals(mode);
    }

    public static boolean isDuels(String mode) {
        return BrawlMode.DUELS.value.equals(mode);
    }

    public static boolean isAll(String mode) {
        return BrawlMode.ALL.value.equals(mode);
    }

    public static boolean isBigGame(String mode) {
        return BrawlMode.BIG_GAME.value.equals(mode);
    }

    public static boolean isSolo(String mode) {
        return BrawlMode.fromValue(mode).map(BrawlMode::isSolo).orElse(false);
    }

    public static boolean isPentaMode(String mode) {
        return BrawlMode.fromValue(mode).map(BrawlMode::isPenta).orElse(false);
    }
}
