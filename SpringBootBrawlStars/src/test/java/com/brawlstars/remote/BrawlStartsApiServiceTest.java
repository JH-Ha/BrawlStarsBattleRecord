package com.brawlstars.remote;


import com.brawlstars.json.EventInfo;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import jdk.jfr.Description;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class BrawlStartsApiServiceTest {

    @Autowired
    BrawlStarsApiService brawlStarsApiService;

    @Description("Check get battleLog from Brawl Stars API server properly")
    @Test
    void testGetBattleLog() throws Exception {
        // Given
        String tag = "#9QU209UYC";

        // When
        List<Item> items = brawlStarsApiService.getItems(tag);

        // Then : get 25 records from brawl Starts API Server
        Assertions.assertThat(items.size()).isEqualTo(25);
    }

    @Test
    void testGetPlayerInfo() throws Exception {
        // Given
        String tag = "#9QU209UYC";

        // When
        PlayerInfo playerInfo = brawlStarsApiService.getPlayerInfo(tag);

        // Then
        String name = playerInfo.getName();
        assertThat(name).isEqualTo("폼폼");
    }

    @Test
    void testGetEventsRotation() {
        // When
        EventInfo[] eventInfos = brawlStarsApiService.getEventsRotation();

        // Then : eventRotations must contain gem grab mode because it is the basic mode of brawl stars.
        boolean hasGemGrab = Arrays.stream(eventInfos)
                .anyMatch(eventInfo -> eventInfo.getEvent().getMode().equals("gemGrab"));
        assertThat(hasGemGrab).isEqualTo(true);
    }
}
