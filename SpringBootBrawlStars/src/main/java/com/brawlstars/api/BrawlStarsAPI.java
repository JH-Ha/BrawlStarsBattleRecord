package com.brawlstars.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Component;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.EventInfo;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BrawlStarsAPI {
	final static String BASE_PLAYERS_URL = "https://api.brawlstars.com/v1/players/";
	final static String EVENTS_ROTATIONS_URL = "https://api.brawlstars.com/v1/events/rotation";
	
	final static String TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRiMmJkOWM5LTk2OTgtNGM1ZC04MmI1LTgyNWVlYWViY2EzMCIsImlhdCI6MTYzMjI5NjUwNiwic3ViIjoiZGV2ZWxvcGVyLzRmODljMjEyLWE0OWYtZWRiZS0zZjgzLTRhODJiZGE2N2NiNSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTguMTQxLjIzMS4xMDAiLCIxMTAuMTAuMTU0LjY4IiwiMTUuMTY1LjE4Mi4yMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.gQssf0mS5_FPaAY3xkgBn51_0AVkPNxqBWtgkmEk3KIrKFe01GIrdvYxj0RTMnOtGiLFhjHUKy1F8_0gkghcvw";
	
	public List<Item> getItems(String tag) throws Exception {

		String tagReplaced = tag.replace("#", "%23");
		List<Item> items = getObjectFromJson(BASE_PLAYERS_URL + tagReplaced + "/battlelog", BattleLog.class).getItems();
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
	
	public EventInfo[] getEventsRotation() throws Exception {

		EventInfo[] eventInfos = null;
		try {
			eventInfos = getObjectFromJson(EVENTS_ROTATIONS_URL, EventInfo[].class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return eventInfos;
	}
	public <T> T getObjectFromJson(String stringUrl, Class<T> valueType) throws IOException {
		URL url = new URL(stringUrl);
		HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
		conn.setRequestProperty("Accept", "application/json");
		conn.setRequestProperty("Authorization", "Bearer " + TOKEN);
		conn.setRequestMethod("GET");

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		String output;

		StringBuffer response = new StringBuffer();

		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		in.close();

		ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		T t = mapper.readValue(response.toString(), valueType);
		return t;
	}

}
