package com.brawlstars.util;

import java.util.Arrays;
import java.util.Optional;

public enum BrawlMode {

    // TRIO (3v3)
    GEM_GRAB("gemGrab", Category.TRIO),
    BRAWL_BALL("brawlBall", Category.TRIO),
    HEIST("heist", Category.TRIO),
    BOUNTY("bounty", Category.TRIO),
    SIEGE("siege", Category.TRIO),
    HOT_ZONE("hotZone", Category.TRIO),
    KNOCKOUT("knockout", Category.TRIO),
    BASKET_BRAWL("basketBrawl", Category.TRIO),
    VOLLEY_BRAWL("volleyBrawl", Category.TRIO),
    HOLD_THE_TROPHY("holdTheTrophy", Category.TRIO),
    TROPHY_THIEVES("trophyThieves", Category.TRIO),
    WIPEOUT("wipeout", Category.TRIO),
    PAYLOAD("payload", Category.TRIO),
    INVASION("invasion", Category.TRIO),
    PAINT_BRAWL("paintBrawl", Category.TRIO),

    // SOLO
    SOLO_SHOWDOWN("soloShowdown", Category.SOLO),
    HUNTERS("hunters", Category.SOLO),
    TAKEDOWN("takedown", Category.SOLO),
    TROPHY_ESCAPE("trophyEscape", Category.SOLO),

    // DUO
    DUO_SHOWDOWN("duoShowdown", Category.DUO),

    // PENTA (5v5)
    GEM_GRAB_5V5("gemGrab5V5", Category.PENTA),
    BRAWL_BALL_5V5("brawlBall5V5", Category.PENTA),
    HEIST_5V5("heist5V5", Category.PENTA),
    BOUNTY_5V5("bounty5V5", Category.PENTA),
    HOT_ZONE_5V5("hotZone5V5", Category.PENTA),
    KNOCKOUT_5V5("knockout5V5", Category.PENTA),
    WIPEOUT_5V5("wipeout5V5", Category.PENTA),

    // DUELS
    DUELS("duels", Category.DUELS),

    // OTHER
    BIG_GAME("bigGame", Category.OTHER),
    UNKNOWN("unknown", Category.OTHER),
    ALL("ALL", Category.OTHER);

    public final String value;
    public final Category category;

    BrawlMode(String value, Category category) {
        this.value = value;
        this.category = category;
    }

    public static Optional<BrawlMode> fromValue(String value) {
        return Arrays.stream(values())
                .filter(m -> m.value.equals(value))
                .findFirst();
    }

    public boolean isTrio()  { return category == Category.TRIO; }
    public boolean isSolo()  { return category == Category.SOLO; }
    public boolean isDuo()   { return category == Category.DUO; }
    public boolean isPenta() { return category == Category.PENTA; }
    public boolean isDuels() { return category == Category.DUELS; }

    public enum Category {
        TRIO, SOLO, DUO, PENTA, DUELS, OTHER
    }
}
