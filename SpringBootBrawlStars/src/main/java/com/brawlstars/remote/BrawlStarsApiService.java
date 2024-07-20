package com.brawlstars.remote;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.EventInfo;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import java.net.URI;
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
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
public class BrawlStarsApiService {

  final static String BASE_PLAYERS_URL = "https://api.brawlstars.com/v1/players";
  final static String EVENTS_ROTATIONS_URL = "https://api.brawlstars.com/v1/events/rotation";

  @Autowired
  private RestTemplate brawlApiServerRestTemplate;

  public List<Item> getItems(String tag) throws Exception {

    URI uri = UriComponentsBuilder.fromUriString(BASE_PLAYERS_URL + "/{tag}/battlelog")
        .buildAndExpand(tag)
        .toUri();
    List<Item> items = getObjectFromJson(uri, BattleLog.class).getItems();
    if (items == null) {
      throw new Exception("Invalid tag");
    }
    return items;
  }

  public PlayerInfo getPlayerInfo(String tag) throws Exception {
    URI uri = UriComponentsBuilder.fromUriString(BASE_PLAYERS_URL + "/{tag}")
        .buildAndExpand(tag)
        .toUri();
    PlayerInfo playerInfo = getObjectFromJson(uri, PlayerInfo.class);
    if (playerInfo == null) {
      throw new Exception("Invalid tag");
    }
    return playerInfo;
  }

  public EventInfo[] getEventsRotation() {

    EventInfo[] eventInfos = null;
    try {
      URI uri = UriComponentsBuilder.fromUriString(EVENTS_ROTATIONS_URL)
          .encode()
          .build()
          .toUri();
      eventInfos = getObjectFromJson(uri, EventInfo[].class);
    } catch (Exception e) {
      log.error("failed to get event rotation", e);
    }

    return eventInfos;
  }

  public <T> T getObjectFromJson(URI uri, Class<T> valueType) {

    HttpHeaders headers = new HttpHeaders();
    List<MediaType> acceptableMediaTypes = new ArrayList<>();
    acceptableMediaTypes.add(MediaType.APPLICATION_JSON);
    headers.setAccept(acceptableMediaTypes);

    HttpEntity<Void> req = new HttpEntity<>(headers);

    try {

      HttpEntity<T> response = brawlApiServerRestTemplate.exchange(uri, HttpMethod.GET, req,
          valueType);
      return response.getBody();
    } catch (RestClientException e) {
      log.warn("failed to request uri : {}", uri);
      throw e;
    }
  }

}
