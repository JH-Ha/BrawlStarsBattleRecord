package com.brawlstars;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.repository.RecordRepository;
import com.brawlstars.service.RecordService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class APITest {
	@Autowired
	RecordRepository recordRepository;
	@Autowired
	RecordService recordService;

	@Test
	public void getBattleLog() {
		String baseUrl = "https://api.brawlstars.com/v1/players/";
		String tag = "#9QU209UYC";
		String replaceTag = tag.replace("#", "%23");
		try {
			URL url = new URL(baseUrl + replaceTag + "/battlelog");
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

			ObjectMapper mapper = new ObjectMapper();

			BattleLog battleLog = mapper.readValue(response.toString(), BattleLog.class);

			List<Item> items = battleLog.getItems();

			items.stream().forEach(item -> {
				System.out.println(item.getBattleTime());
				if (recordService.isTrioMode(item.getEvent().getMode())) {
					recordService.saveTrio(tag, item);
				} else if(recordService.isDuo(item.getEvent().getMode())) {
					recordService.saveDuo(tag, item);
				} else if(recordService.isSole(item.getEvent().getMode())) {
					recordService.saveSole(tag, item);
				}
			});
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
