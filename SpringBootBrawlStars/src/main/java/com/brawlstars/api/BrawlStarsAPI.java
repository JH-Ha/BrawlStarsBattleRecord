package com.brawlstars.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Component;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.json.playerInfo.PlayerInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BrawlStarsAPI {
	final static String BASE_PLAYERS_URL = "https://api.brawlstars.com/v1/players/";
	final static String TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjgxYmYyZTVjLWVjNWUtNGY0NC1iM2NhLWQ5ZjI3MzlmYmJlOSIsImlhdCI6MTYxNTk4MTc1OCwic3ViIjoiZGV2ZWxvcGVyLzRmODljMjEyLWE0OWYtZWRiZS0zZjgzLTRhODJiZGE2N2NiNSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTguMTQzLjIwNi40MSIsIjExMC4xMC4xNTQuNjgiLCIxNS4xNjUuMTgyLjIyOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.7vQ8OoFdLQfFRTIkrzqeA3Q4uh732LWX82T4_jVWWJKB0Ghk_DGxyH21iOhxL4hyKMSSzNyxL9g4cyHJrkdTEg";
	
	public List<Item> getItems(String tag) throws Exception {

		String tagReplaced = tag.replace("#", "%23");
		List<Item> items = null;
		try {
			URL url = new URL(BASE_PLAYERS_URL + tagReplaced + "/battlelog");
			
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

			System.out.println("Response: " + response.toString());

			ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);

			// ObjectMapper mapper = new ObjectMapper();

			BattleLog battleLog = mapper.readValue(response.toString(), BattleLog.class);

			items = battleLog.getItems();

		} catch (Exception e) {
			e.printStackTrace();
		}
		if (items == null) {
			throw new Exception("Invalid tag");
		}
		return items;
	}
	
	public PlayerInfo getPlayerInfo(String tag) throws Exception {

		String tagReplaced = tag.replace("#", "%23");
		PlayerInfo playerInfo = null;
		try {
			URL url = new URL(BASE_PLAYERS_URL + tagReplaced);
			
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

			System.out.println("Response: " + response.toString());

			ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
					false);

			// ObjectMapper mapper = new ObjectMapper();
			playerInfo = mapper.readValue(response.toString(), PlayerInfo.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		if (playerInfo == null) {
			throw new Exception("Invalid tag");
		}
		return playerInfo;
	}

}
