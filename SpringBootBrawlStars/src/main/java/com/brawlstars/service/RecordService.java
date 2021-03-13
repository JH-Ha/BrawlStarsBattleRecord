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
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.domain.Member;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordDuo;
import com.brawlstars.domain.RecordSolo;
import com.brawlstars.domain.RecordTrio;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecordService {

	@Autowired
	private RecordRepository recordRepository;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private BrawlStarsAPI brawlStarsAPI;

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
		if ("bigGame".equals(mode)) {
			return true;
		}
		return false;
	}

	public boolean isSolo(String mode) {
		if ("soloShowdown".equals(mode)) {
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

	public String makeGroupKey(List<Player> players, String battleTime) {
		players.sort((Player a, Player b) -> {
			return a.getTag().compareTo(b.getTag());
		});
		// make team key to get team record
		String groupKey = players.stream().map(s -> s.getTag()).reduce("", (a, b) -> a + b);
		groupKey += battleTime;
		return groupKey;
	}

	public void saveTrio(String tag, Item item) {
		// TODO Auto-generated method stub
		// Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());

		Record foundRecord = recordRepository.findOne(tag, item.getBattleTime());
		if (foundRecord != null) {
			foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
			recordRepository.save(foundRecord);
			return;
		}

		List<List<Player>> teams = item.getBattle().getTeams();
		List<Player> players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
		String groupKey = makeGroupKey(players, item.getBattleTime());

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
				recordTrio.setBattleTime(item.getBattleTime());
				recordTrio.setBrawlerName(player.getBrawler().getName());
				recordTrio.setPower(player.getBrawler().getPower());
				recordTrio.setGroupKey(groupKey);
				recordTrio.setDuration(item.getBattle().getDuration());
				recordTrio.setMap(item.getEvent().getMap());
				recordTrio.setMode(item.getEvent().getMode());
				recordTrio.setType(item.getBattle().getType());
				recordTrio.setTag(player.getTag());
				recordTrio.setTrophies(player.getBrawler().getTrophies());
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
		List<List<Player>> teams = item.getBattle().getTeams();
		List<Player> players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
		String groupKey = makeGroupKey(players, item.getBattleTime());

		// Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());

		/*
		 * if(foundRecord != null) {
		 * foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
		 * recordRepository.save(foundRecord); return; }
		 */

		for (int i = 0; i < teams.size(); i++) {
			List<Player> team = teams.get(i);
			for (int j = 0; j < team.size(); j++) {
				Player player = team.get(j);

				/*
				 * Record foundRecord = recordRepository.findOne(tag, item.getBattleTime());
				 * if(foundRecord != null) { if(tag.equals(player.getTag()))
				 * foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
				 * recordRepository.save(foundRecord); continue; }
				 */

				RecordDuo recordDuo = new RecordDuo();
				recordDuo.setTag(player.getTag());
				recordDuo.setBattleTime(item.getBattleTime());
				recordDuo.setBrawlerName(player.getBrawler().getName());
				recordDuo.setPower(player.getBrawler().getPower());
				recordDuo.setMap(item.getEvent().getMap());
				recordDuo.setGroupKey(groupKey);
				recordDuo.setMode(item.getEvent().getMode());
				recordDuo.setType(item.getBattle().getType());
				recordDuo.setResultRank(i + 1);

				if (tag.equals(player.getTag()))
					recordDuo.setTrophyChange(item.getBattle().getTrophyChange());

				recordRepository.save(recordDuo);
			}
		}
	}

	public void saveSolo(String tag, Item item) {
		// TODO Auto-generated method stub
		List<Player> players = item.getBattle().getPlayers();
		String groupKey = makeGroupKey(players, item.getBattleTime());
		// Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());

		for (int i = 0; i < players.size(); i++) {
			Player player = players.get(i);
			Record foundRecord = recordRepository.findOne(player.getTag(), item.getBattleTime());
			if (foundRecord != null) {
				if (tag.equals(player.getTag()))
					foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
				recordRepository.save(foundRecord);
				continue;
			}
			RecordSolo recordSolo = RecordSolo.createSoloRecord(tag, item, player, groupKey, i + 1);
			recordRepository.save(recordSolo);
		}
	}

	public void savePlayers(String tag) {
		// TODO Auto-generated method stub
		try {
			List<Item> items = brawlStarsAPI.getItems(tag);
			items.stream().forEach(item -> {
				List<List<Player>> teams = item.getBattle().getTeams();
				List<Player> players;
				if (teams != null)
					players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
				else
					players = item.getBattle().getPlayers();

				for (int i = 0; i < players.size(); i++) {
					Player player = players.get(i);
					Member foundMember = memberRepository.findOne(player.getTag());
					if (foundMember != null)
						continue;
					Member member = Member.createMember(player.getTag(), player.getName());
					try {
						memberRepository.save(member);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			});
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

	public void saveBattleLog(List<Item> items, String tag) {
		items.stream().forEach(item -> {
			System.out.println(item.getBattleTime());
			if (isTrioMode(item.getEvent().getMode())) {
				saveTrio(tag, item);
			} else if (isDuo(item.getEvent().getMode())) {
				saveDuo(tag, item);
			} else if (isSolo(item.getEvent().getMode())) {
				saveSolo(tag, item);
			}
		});
	}

	public List<RecordDto> getFindByTag(String tag) {
		List<Record> records = recordRepository.findByTag(tag);
		List<RecordDto> recordDtos = records.stream().map(record -> new RecordDto(record)).collect(Collectors.toList());

//		records.stream().forEach(r -> {
//		List<Record> groupRecords = r.getGroupRecords();
//			groupRecords.stream().forEach(rr -> {
//				System.out.println(rr.getBattleTime());
//			});
		// });
		return recordDtos;
	}

	public void save(Record record) {
		// TODO Auto-generated method stub
		recordRepository.save(record);
	}

	public long removeByTag(String tag) {
		// TODO Auto-generated method stub
		return recordRepository.removeByTag(tag);
	}

}
