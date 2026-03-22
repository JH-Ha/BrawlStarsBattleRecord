package com.brawlstars.util;

public class CommonUtil {

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
