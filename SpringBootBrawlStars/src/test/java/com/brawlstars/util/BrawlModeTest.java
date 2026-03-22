package com.brawlstars.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class BrawlModeTest {

    @Test
    void fromValue_returnsCorrectEnum() {
        assertThat(BrawlMode.fromValue("gemGrab")).contains(BrawlMode.GEM_GRAB);
        assertThat(BrawlMode.fromValue("soloShowdown")).contains(BrawlMode.SOLO_SHOWDOWN);
        assertThat(BrawlMode.fromValue("duoShowdown")).contains(BrawlMode.DUO_SHOWDOWN);
        assertThat(BrawlMode.fromValue("duels")).contains(BrawlMode.DUELS);
        assertThat(BrawlMode.fromValue("knockout5V5")).contains(BrawlMode.KNOCKOUT_5V5);
    }

    @Test
    void fromValue_returnsEmptyForUnknownValue() {
        assertThat(BrawlMode.fromValue("notAMode")).isEmpty();
        assertThat(BrawlMode.fromValue("")).isEmpty();
        assertThat(BrawlMode.fromValue(null)).isEmpty();
    }

    @Test
    void trioModes_areClassifiedCorrectly() {
        assertThat(BrawlMode.GEM_GRAB.isTrio()).isTrue();
        assertThat(BrawlMode.BRAWL_BALL.isTrio()).isTrue();
        assertThat(BrawlMode.HEIST.isTrio()).isTrue();
        assertThat(BrawlMode.BOUNTY.isTrio()).isTrue();
        assertThat(BrawlMode.SIEGE.isTrio()).isTrue();
        assertThat(BrawlMode.HOT_ZONE.isTrio()).isTrue();
        assertThat(BrawlMode.KNOCKOUT.isTrio()).isTrue();
        assertThat(BrawlMode.BASKET_BRAWL.isTrio()).isTrue();
        assertThat(BrawlMode.VOLLEY_BRAWL.isTrio()).isTrue();
        assertThat(BrawlMode.HOLD_THE_TROPHY.isTrio()).isTrue();
        assertThat(BrawlMode.TROPHY_THIEVES.isTrio()).isTrue();
        assertThat(BrawlMode.WIPEOUT.isTrio()).isTrue();
        assertThat(BrawlMode.PAYLOAD.isTrio()).isTrue();
        assertThat(BrawlMode.INVASION.isTrio()).isTrue();
        assertThat(BrawlMode.PAINT_BRAWL.isTrio()).isTrue();
    }

    @Test
    void soloModes_areClassifiedCorrectly() {
        assertThat(BrawlMode.SOLO_SHOWDOWN.isSolo()).isTrue();
        assertThat(BrawlMode.HUNTERS.isSolo()).isTrue();
        assertThat(BrawlMode.TAKEDOWN.isSolo()).isTrue();
        assertThat(BrawlMode.TROPHY_ESCAPE.isSolo()).isTrue();
    }

    @Test
    void duoMode_isClassifiedCorrectly() {
        assertThat(BrawlMode.DUO_SHOWDOWN.isDuo()).isTrue();
    }

    @Test
    void pentaModes_areClassifiedCorrectly() {
        assertThat(BrawlMode.GEM_GRAB_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.BRAWL_BALL_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.HEIST_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.BOUNTY_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.HOT_ZONE_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.KNOCKOUT_5V5.isPenta()).isTrue();
        assertThat(BrawlMode.WIPEOUT_5V5.isPenta()).isTrue();
    }

    @Test
    void duelsMode_isClassifiedCorrectly() {
        assertThat(BrawlMode.DUELS.isDuels()).isTrue();
    }

    @ParameterizedTest
    @EnumSource(value = BrawlMode.class, names = {"SOLO_SHOWDOWN", "HUNTERS", "TAKEDOWN", "TROPHY_ESCAPE"})
    void soloModes_areNotTrio(BrawlMode mode) {
        assertThat(mode.isTrio()).isFalse();
    }

    @ParameterizedTest
    @EnumSource(value = BrawlMode.class, names = {
            "GEM_GRAB_5V5", "BRAWL_BALL_5V5", "HEIST_5V5", "BOUNTY_5V5",
            "HOT_ZONE_5V5", "KNOCKOUT_5V5", "WIPEOUT_5V5"
    })
    void pentaModes_areNotTrio(BrawlMode mode) {
        assertThat(mode.isTrio()).isFalse();
    }

    @Test
    void eachMode_belongsToExactlyOneCategory() {
        for (BrawlMode mode : BrawlMode.values()) {
            int count = 0;
            if (mode.isTrio())  count++;
            if (mode.isSolo())  count++;
            if (mode.isDuo())   count++;
            if (mode.isPenta()) count++;
            if (mode.isDuels()) count++;
            // OTHER modes should not match any category flag
            if (mode.category == BrawlMode.Category.OTHER) {
                assertThat(count).as("%s should have no category flag", mode).isEqualTo(0);
            } else {
                assertThat(count).as("%s should belong to exactly one category", mode).isEqualTo(1);
            }
        }
    }

    @Test
    void value_matchesExpectedApiString() {
        assertThat(BrawlMode.GEM_GRAB.value).isEqualTo("gemGrab");
        assertThat(BrawlMode.SOLO_SHOWDOWN.value).isEqualTo("soloShowdown");
        assertThat(BrawlMode.DUO_SHOWDOWN.value).isEqualTo("duoShowdown");
        assertThat(BrawlMode.KNOCKOUT_5V5.value).isEqualTo("knockout5V5");
        assertThat(BrawlMode.DUELS.value).isEqualTo("duels");
        assertThat(BrawlMode.UNKNOWN.value).isEqualTo("unknown");
        assertThat(BrawlMode.ALL.value).isEqualTo("ALL");
    }
}
