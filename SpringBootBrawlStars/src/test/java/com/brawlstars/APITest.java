package com.brawlstars;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brawlstars.domain.RecordTrio;
import com.brawlstars.json.BattleLog;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
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

					SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd'T'HHmmss.SSS'Z'");
					sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
					Date battleTimeDate = null;
					try {
						battleTimeDate = sdf.parse(item.getBattleTime());
						System.out.println(battleTimeDate);
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

					List<List<Player>> teams = item.getBattle().getTeams();
					List<Player> players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
					players.sort((Player a, Player b) -> {
						return a.getTag().compareTo(b.getTag());
					});
					// make team key to get team record
					String groupKey = players.stream().map(s -> s.getTag()).reduce("", (a, b) -> a + b);
					groupKey += item.getBattleTime();

					int playerGroupIdx = 0;
					for (int i = 0; i < teams.size(); i++) {
						List<Player> team = teams.get(i);
						for (int j = 0; j < team.size(); j++) {
							Player player = team.get(j);
							if (player.getTag().equals(tag)) {
								playerGroupIdx = j;
								break;
							}
						}
					}

					for (int i = 0; i < teams.size(); i++) {
						List<Player> team = teams.get(i);
						for (int j = 0; j < team.size(); j++) {
							Player player = team.get(j);
							RecordTrio recordTrio = new RecordTrio();
							recordTrio.setBattleTime(battleTimeDate);
							recordTrio.setBrawlerName(player.getBrawler().getName());
							recordTrio.setPower(player.getBrawler().getPower());
							recordTrio.setGroupKey(groupKey);
							recordTrio.setDuration(item.getBattle().getDuration());
							recordTrio.setMap(item.getEvent().getMap());
							recordTrio.setMode(item.getEvent().getMode());
							recordTrio.setType(item.getBattle().getType());
							recordTrio.setTag(player.getTag());
							recordTrio.setThophies(player.getBrawler().getTrophies());
							// we don't know other players' trophy change
							if (player.getTag().equals(tag)) {
								recordTrio.setTrophyChange(item.getBattle().getTrophyChange());
							}
							boolean isStarPlayer = false;
							if (player.getTag().equals(item.getBattle().getStarPlayer().getTag())) {
								isStarPlayer = true;
							}
							recordTrio.setIsStarPlayer(isStarPlayer);
							String result = item.getBattle().getResult();
							if (j == playerGroupIdx)
								recordTrio.setResult(result);
							else
								recordTrio.setResult(recordService.getOppositeResult(result));

							recordRepository.save(recordTrio);
						}
					}

				}

			});
		} catch (

		IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
