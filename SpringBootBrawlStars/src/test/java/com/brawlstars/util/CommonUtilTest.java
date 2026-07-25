package com.brawlstars.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

class CommonUtilTest {

    // --- isTrioMode ---

    @ParameterizedTest
    @ValueSource(strings = {"gemGrab", "brawlBall", "heist", "bounty", "siege", "hotZone",
            "knockout", "basketBrawl", "volleyBrawl", "holdTheTrophy", "trophyThieves",
            "wipeout", "payload", "invasion", "paintBrawl"})
    void isTrioMode_returnsTrueForTrioModes(String mode) {
        assertThat(CommonUtil.isTrioMode(mode)).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"soloShowdown", "duoShowdown", "duels", "gemGrab5V5", "bigGame", "unknown"})
    void isTrioMode_returnsFalseForNonTrioModes(String mode) {
        assertThat(CommonUtil.isTrioMode(mode)).isFalse();
    }

    @Test
    void isTrioMode_returnsFalseForNull() {
        assertThat(CommonUtil.isTrioMode(null)).isFalse();
    }

    // --- isSolo ---

    @ParameterizedTest
    @ValueSource(strings = {"soloShowdown", "hunters", "takedown", "trophyEscape"})
    void isSolo_returnsTrueForSoloModes(String mode) {
        assertThat(CommonUtil.isSolo(mode)).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"gemGrab", "duoShowdown", "duels", "gemGrab5V5"})
    void isSolo_returnsFalseForNonSoloModes(String mode) {
        assertThat(CommonUtil.isSolo(mode)).isFalse();
    }

    @Test
    void isSolo_returnsFalseForNull() {
        assertThat(CommonUtil.isSolo(null)).isFalse();
    }

    // --- isDuoShowdown ---

    @Test
    void isDuoShowdown_returnsTrueForDuoShowdown() {
        assertThat(CommonUtil.isDuoShowdown("duoShowdown")).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"soloShowdown", "gemGrab", "duels", ""})
    void isDuoShowdown_returnsFalseForOtherModes(String mode) {
        assertThat(CommonUtil.isDuoShowdown(mode)).isFalse();
    }

    // --- isDuels ---

    @Test
    void isDuels_returnsTrueForDuels() {
        assertThat(CommonUtil.isDuels("duels")).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"gemGrab", "soloShowdown", "duoShowdown", ""})
    void isDuels_returnsFalseForOtherModes(String mode) {
        assertThat(CommonUtil.isDuels(mode)).isFalse();
    }

    // --- isPentaMode ---

    @ParameterizedTest
    @ValueSource(strings = {"gemGrab5V5", "brawlBall5V5", "heist5V5", "bounty5V5",
            "hotZone5V5", "knockout5V5", "wipeout5V5"})
    void isPentaMode_returnsTrueForPentaModes(String mode) {
        assertThat(CommonUtil.isPentaMode(mode)).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"gemGrab", "soloShowdown", "duels"})
    void isPentaMode_returnsFalseForNonPentaModes(String mode) {
        assertThat(CommonUtil.isPentaMode(mode)).isFalse();
    }

    @Test
    void isPentaMode_returnsFalseForNull() {
        assertThat(CommonUtil.isPentaMode(null)).isFalse();
    }

    // --- isBigGame ---

    @Test
    void isBigGame_returnsTrueForBigGame() {
        assertThat(CommonUtil.isBigGame("bigGame")).isTrue();
    }

    @Test
    void isBigGame_returnsFalseForOtherMode() {
        assertThat(CommonUtil.isBigGame("gemGrab")).isFalse();
    }

    // --- isAll ---

    @Test
    void isAll_returnsTrueForALL() {
        assertThat(CommonUtil.isAll("ALL")).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"all", "All", "gemGrab", ""})
    void isAll_returnsFalseForNonALL(String mode) {
        assertThat(CommonUtil.isAll(mode)).isFalse();
    }
}
