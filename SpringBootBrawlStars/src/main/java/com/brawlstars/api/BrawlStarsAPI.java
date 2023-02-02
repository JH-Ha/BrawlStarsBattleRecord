package com.brawlstars.api;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.EventInfo;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class BrawlStarsAPI {

  final static String BASE_PLAYERS_URL = "https://api.brawlstars.com/v1/players/";
  final static String EVENTS_ROTATIONS_URL = "https://api.brawlstars.com/v1/events/rotation";

  @Autowired
  private RestTemplate brawlApiServerRestTemplate;

  public List<Item> getItems(String tag) throws Exception {

    String tagReplaced = tag.replace("#", "%23");
    List<Item> items = getObjectFromJson(BASE_PLAYERS_URL + tagReplaced + "/battlelog",
        BattleLog.class).getItems();
    if (items == null) {
      throw new Exception("Invalid tag");
    }
    return items;
  }

  public PlayerInfo getPlayerInfo(String tag) throws Exception {

    String tagReplaced = tag.replace("#", "%23");
    PlayerInfo playerInfo = getObjectFromJson(BASE_PLAYERS_URL + tagReplaced, PlayerInfo.class);
    if (playerInfo == null) {
      throw new Exception("Invalid tag");
    }
    return playerInfo;
  }

  public EventInfo[] getEventsRotation() {

    EventInfo[] eventInfos = null;
    try {
      eventInfos = getObjectFromJson(EVENTS_ROTATIONS_URL, EventInfo[].class);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return eventInfos;
  }

  public <T> T getObjectFromJson(String stringUrl, Class<T> valueType) throws URISyntaxException {

    HttpHeaders headers = new HttpHeaders();
    List<MediaType> acceptableMediaTypes = new ArrayList<>();
    acceptableMediaTypes.add(MediaType.APPLICATION_JSON);
    headers.setAccept(acceptableMediaTypes);

    HttpEntity<Void> req = new HttpEntity<>(headers);

    URI uri = new URI(stringUrl);
    try {

      HttpEntity<T> response = brawlApiServerRestTemplate.exchange(uri, HttpMethod.GET, req,
          valueType);
      return response.getBody();
    } catch (RestClientException e) {
      log.warn("failed to request url : {}", stringUrl);
      throw e;
    }
  }

}
