package com.brawlstars.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class RecordController {

	@GetMapping("/record/{tag}")
	public List<RecordDto> getRecords() {
		// List<RecordDto> recordDtos = null;
		return null;
	}

	@GetMapping("/record/save/{tag}")
	public String saveRecords(@PathVariable(name = "tag") String tag) {
		String baseUrl = "https://api.brawlstars.com/v1/players/";
		tag = tag.replace("#", "%23");
		try {
			URL url = new URL(baseUrl + tag + "/battlelog");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjAzM2YwNDRmLTIzZTUtNGJhZC04ZDdhLWVlODgzOTk0NDIyMSIsImlhdCI6MTYxNDA5Mzc2NSwic3ViIjoiZGV2ZWxvcGVyLzRmODljMjEyLWE0OWYtZWRiZS0zZjgzLTRhODJiZGE2N2NiNSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTguMTQzLjIwNi40MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.YknOO4aOE7OxNQ1SWZ-ojAp73SqDMXxiA-hyUzHnPcF36HiOQeFPUgHMv6LmHEA8YwWiSL-tWBRRfZZAZvrA6g";
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

			// ObjectMapper mapper = new
			// ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
			// false);

			ObjectMapper mapper = new ObjectMapper();

			BattleLog battleLog = mapper.readValue(response.toString(), BattleLog.class);

			List<Item> items = battleLog.getItems();

			items.stream().forEach(item -> {
				System.out.println(item.getBattleTime());

			});
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}

	class RecordDto {

	}
}