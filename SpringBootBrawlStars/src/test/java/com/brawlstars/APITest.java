package com.brawlstars;


import static org.assertj.core.api.Assertions.assertThat;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.json.EventInfo;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import java.util.List;
import jdk.jfr.Description;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class APITest {

  @Autowired
  BrawlStarsAPI brawlStarsAPI;

  @Description("Check get battleLog from Brawl Stars API server properly")
  @Test
  public void getBattleLog() throws Exception {
    String tag = "#9QU209UYC";
    List<Item> items = brawlStarsAPI.getItems(tag);
    //get 25 rocords from brawl Starts API Server
    Assertions.assertThat(items.size()).isEqualTo(25);
  }

  @Test
  public void getPlayerInfo() throws Exception {
    String tag = "#9QU209UYC";
    PlayerInfo playerInfo = brawlStarsAPI.getPlayerInfo(tag);

    String name = playerInfo.getName();
    assertThat(name).isEqualTo("폼폼");
  }

  @Test
  public void getEventsRotation() {
    EventInfo[] eventInfos = brawlStarsAPI.getEventsRotation();
    Boolean hasGemGrab = false;
    for (var eventInfo : eventInfos) {
      if (eventInfo.getEvent().getMode().equals("gemGrab")) {
        hasGemGrab = true;
        break;
      }
    }
    // eventRotations must contain gem grab mode because it is the basic mode of brawl stars.
    assertThat(hasGemGrab).isEqualTo(true);
  }
}
