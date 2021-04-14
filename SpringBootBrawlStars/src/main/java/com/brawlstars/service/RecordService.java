package com.brawlstars.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.domain.GameMap;
import com.brawlstars.domain.Member;
import com.brawlstars.domain.Record;
import com.brawlstars.domain.RecordDuo;
import com.brawlstars.domain.RecordSearch;
import com.brawlstars.domain.RecordSolo;
import com.brawlstars.domain.RecordTrio;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.repository.GameMapDto;
import com.brawlstars.repository.GameMapRepository;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordRepository;
import com.brawlstars.repository.RecordResultDto;

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
	private GameMapRepository gameMapRepositry;
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
				|| "siege".equals(mode) || "hotZone".equals(mode) || "knockout".equals(mode);
	}

	public boolean isDuo(String mode) {
		// TODO Auto-generated method stub
		return "duoShowdown".equals(mode);
	}
	public boolean isAll(String mode) {
		return "ALL".equals(mode);
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
		//List<Player> players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
		//String groupKey = makeGroupKey(players, item.getBattleTime());

		int playerGroupIdx = 0;
		for (int i = 0; i < teams.size(); i++) {
			List<Player> team = teams.get(i);
			for (int j = 0; j < team.size(); j++) {
				Player player = team.get(j);
				if (player.getTag().equals(tag)) {
					playerGroupIdx = i;
					break;
				}
			}
		}
		Record myRecord = null;
		List<Record> groupRecords = new ArrayList<Record>();

		for (int i = 0; i < teams.size(); i++) {
			List<Player> team = teams.get(i);
			for (int j = 0; j < team.size(); j++) {
				Player player = team.get(j);
				RecordTrio recordTrio = new RecordTrio();
				recordTrio.setBattleTime(item.getBattleTime());
				recordTrio.setBrawlerName(player.getBrawler().getName());
				recordTrio.setPower(player.getBrawler().getPower());
				// recordTrio.setGroupKey(groupKey);
				recordTrio.setDuration(item.getBattle().getDuration());
				recordTrio.setMap(item.getEvent().getMap());
				recordTrio.setMode(item.getBattle().getMode());
				recordTrio.setType(item.getBattle().getType());
				recordTrio.setTag(player.getTag());
				recordTrio.setTrophies(player.getBrawler().getTrophies());
				recordTrio.setPlayerName(player.getName());
				recordTrio.setTeamId(i);
				recordTrio.setEventId(item.getEvent().getId());
				recordTrio.setBrawlerId(player.getBrawler().getId());
				// we don't know other players' trophy change
				if (player.getTag().equals(tag)) {
					recordTrio.setTrophyChange(item.getBattle().getTrophyChange());
					myRecord = recordTrio;
				}
				boolean isStarPlayer = false;
				if (item.getBattle().getStarPlayer() != null 
						&& player.getTag().equals(item.getBattle().getStarPlayer().getTag())) {
					isStarPlayer = true;
				}
				recordTrio.setIsStarPlayer(isStarPlayer);
				String result = item.getBattle().getResult();
				if (i == playerGroupIdx)
					recordTrio.setResult(result);
				else
					recordTrio.setResult(getOppositeResult(result));

				groupRecords.add(recordTrio);
				// recordRepository.save(recordTrio);
			}
		}
		Record.setRelation(myRecord, groupRecords);
		recordRepository.save(myRecord);
	}

	public void saveDuo(String tag, Item item) {
		
		//if there is a saved record already, then just update throphychange 
		Record foundRecord = recordRepository.findOne(tag, item.getBattleTime());
		if(foundRecord != null) {
			foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
			recordRepository.save(foundRecord); 
			return;
		}
		
		List<List<Player>> teams = item.getBattle().getTeams();
		//List<Player> players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
		//String groupKey = makeGroupKey(players, item.getBattleTime());

		// Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());

		/*
		 * if(foundRecord != null) {
		 * foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
		 * recordRepository.save(foundRecord); return; }
		 */

		Record myRecord = null;
		List<Record> groupRecords = new ArrayList<Record>();
		
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
				recordDuo.setTrophies(player.getBrawler().getTrophies());
				
				recordDuo.setMap(item.getEvent().getMap());
				//recordDuo.setGroupKey(groupKey);
				recordDuo.setMode(item.getBattle().getMode()); // event mode -> battle mode : event mode is null 
				recordDuo.setType(item.getBattle().getType());
				recordDuo.setResultRank(i + 1);
				recordDuo.setPlayerName(player.getName());
				recordDuo.setEventId(item.getEvent().getId());
				recordDuo.setBrawlerId(player.getBrawler().getId());
				if (tag.equals(player.getTag())) {
					recordDuo.setTrophyChange(item.getBattle().getTrophyChange());
					myRecord = recordDuo;
				}
				
				groupRecords.add(recordDuo);
				//recordRepository.save(recordDuo);
			}
		}
		Record.setRelation(myRecord, groupRecords);
		recordRepository.save(myRecord);
	}

	public void saveSolo(String tag, Item item) {
		
		Record foundRecord = recordRepository.findOne(tag, item.getBattleTime());
		if (foundRecord != null) {
			foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
			recordRepository.save(foundRecord);
			return;
		}
		List<Player> players = item.getBattle().getPlayers();
		//String groupKey = makeGroupKey(players, item.getBattleTime());
		// Date battleTimeDate = makeBattleTimeDate(item.getBattleTime());
		Record myRecord = null;
		List<Record> groupRecords = new ArrayList<Record>();
		for (int i = 0; i < players.size(); i++) {
			Player player = players.get(i);
			RecordSolo recordSolo = RecordSolo.createSoloRecord(tag, item, player, i + 1);
			if(tag.equals(player.getTag())) {
				myRecord = recordSolo;
			}
			groupRecords.add(recordSolo);
			//recordRepository.save(recordSolo);
		}
		Record.setRelation(myRecord, groupRecords);
		recordRepository.save(myRecord);
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

	public Page<RecordDto> findByTag(String tag, Pageable pageable, RecordSearch recordSearch) {
		Page<RecordDto> records = recordRepository.findByTag(tag, pageable,recordSearch);
		//List<RecordDto> recordDtos = records.getContent().stream().map(record -> new RecordDto(record)).collect(Collectors.toList());

//		records.stream().forEach(r -> {
//		List<Record> groupRecords = r.getGroupRecords();
//			groupRecords.stream().forEach(rr -> {
//				System.out.println(rr.getBattleTime());
//			});
		// });
		return records;
	}

	public void save(Record record) {
		// TODO Auto-generated method stub
		recordRepository.save(record);
	}

	public long removeByTag(String tag) {
		// TODO Auto-generated method stub
		return recordRepository.removeByTag(tag);
	}

	public List<RecordResultDto> findByMap(RecordSearch recordSearch) {
		String mode = recordSearch.getMode();
		// TODO Auto-generated method stub
		if(isTrioMode(mode)) {
			return recordRepository.findByMap(recordSearch);
		}else if(isDuo(mode) || isSolo(mode)) {
			return recordRepository.findSoloDuoByMap(recordSearch);
		}else if(isAll(mode)) {
			return recordRepository.findAllResult(recordSearch);
		}
		
		return null;
	}

	public List<GameMapDto> getDistinctGameMaps(String mode){
		return recordRepository.getDistinctGameMaps(mode);
	}

	public void saveDistinctGameMap(String mode) {
		// TODO Auto-generated method stub
		List<GameMapDto> gameMapDtos = getDistinctGameMaps(mode);
		List<GameMap> gameMaps = gameMapDtos.stream().map(dto ->{
			GameMap gameMap = new GameMap();
			gameMap.setMode(dto.getMode());
			gameMap.setName(dto.getName());
			return gameMap;
		}).collect(Collectors.toList());
		
		gameMaps.stream().forEach(map ->{
			if(map.getName() != null) {
				List<GameMapDto> findMapDtos = gameMapRepositry.findByName(map.getName());
				if(findMapDtos.isEmpty())
					gameMapRepositry.saveGameMap(map);
			}
		});
	}


}
