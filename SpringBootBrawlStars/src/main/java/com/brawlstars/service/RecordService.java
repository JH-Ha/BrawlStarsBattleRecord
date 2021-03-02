package com.brawlstars.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordTrio;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.repository.RecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordService {
	
	@Autowired
	private RecordRepository recordRepository;
	
	public String getOppositeResult(String result) {
		if ("defeat".equals(result)) {
			return "victory";
		} else if ("victory".equals(result)) {
			return "defeat";
		}
		return result;
	}

	public boolean isTrioMode(String mode) {
		return "gemGrab".equals(mode) || "brawlBall".equals(mode) || "heist".equals(mode) || "bounty".equals(mode)
				|| "siege".equals(mode) || "hotZone".equals(mode);
	}

	public boolean isDuo(String mode) {
		// TODO Auto-generated method stub
		return "duoShowdown".equals(mode);
	}
	
	public boolean isBigGame(String mode) {
		if("bigGame".equals(mode)) {
			return true;
		}
		return false;
	}
	
	public boolean isSole(String mode) {
		if("soloShowdown".endsWith(mode)) {
			return true;
		}
		return false;
	}
	
	public Date makeBattleTimeDate(String battleTime) {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd'T'HHmmss.SSS'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		Date battleTimeDate = null;
		try {
			battleTimeDate = sdf.parse(battleTime);
			System.out.println(battleTimeDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return battleTimeDate;
	}

	public void saveTrio(String tag, Item item) {
		// TODO Auto-generated method stub
		Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());
		
		Record foundRecord = recordRepository.findOne(tag, battleTimeDate);
		if(foundRecord != null) {
			foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
			recordRepository.save(foundRecord);
			return;
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
					recordTrio.setResult(getOppositeResult(result));

				recordRepository.save(recordTrio);
			}
		}
	}
	public void saveDuo(String tag, Item item) {
		
	}

}
