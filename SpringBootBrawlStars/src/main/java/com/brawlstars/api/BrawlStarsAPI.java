package com.brawlstars.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Component;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BrawlStarsAPI {

	public List<Item> getItems(String tag) throws Exception {
		String baseUrl = "https://api.brawlstars.com/v1/players/";
		String tagReplaced = tag.replace("#", "%23");
		List<Item> items = null;
		try {
			URL url = new URL(baseUrl + tagReplaced + "/battlelog");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRjM2M3MmJlLTFkNTYtNGEwOC1iYzY5LTQ4NjNiNWMwYWM2NiIsImlhdCI6MTYxNTczMjkwNSwic3ViIjoiZGV2ZWxvcGVyLzRmODljMjEyLWE0OWYtZWRiZS0zZjgzLTRhODJiZGE2N2NiNSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTguMTQzLjIwNi40MSIsIjExMC4xMC4xNTQuNjgiLCIxNS4xNjUuMTgyLjIyOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.40RNWPjKXv0bs7fiMFWD9H0H61hTml_uMaZMKYXBQ2Uoz3uS2bljOf9JSsin9sz8C2Ek0K6UZUqh3s_DixZ3gg";
			conn.setRequestProperty("Authorization", "Bearer " + token);
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

}
