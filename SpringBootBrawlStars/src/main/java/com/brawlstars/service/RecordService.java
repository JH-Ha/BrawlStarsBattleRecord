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
import com.brawlstars.domain.Statistics;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.repository.GameMapDto;
import com.brawlstars.repository.GameMapRepository;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordRepository;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.repository.StatisticsRepository;
import com.brawlstars.util.CommonUtil;

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

	@Autowired
	StatisticsRepository statisticsRepository;
	

	public static String getOppositeResult(String result) {
		if ("defeat".equals(result)) {
			return "victory";
		} else if ("victory".equals(result)) {
			return "defeat";
		}
		return result;
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
				RecordTrio recordTrio = RecordTrio.createRecord(item , tag, player, playerGroupIdx, i);
				// we don't know other players' trophy change
				if (player.getTag().equals(tag)) {
					recordTrio.setTrophyChange(item.getBattle().getTrophyChange());
					myRecord = recordTrio;
				}
				groupRecords.add(recordTrio);
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
				String mode = item.getBattle().getMode() ; // event mode -> battle mode : event mode is null
				String map = item.getEvent().getMap(); 
				Long rank = i + 1L;
				String brawlerName = player.getBrawler().getName();
				Integer trophies = player.getBrawler().getTrophies();
				
				RecordDuo recordDuo = new RecordDuo();
				recordDuo.setTag(player.getTag());
				recordDuo.setBattleTime(item.getBattleTime());
				recordDuo.setBrawlerName(brawlerName);
				recordDuo.setPower(player.getBrawler().getPower());
				recordDuo.setTrophies(trophies);
				
				recordDuo.setMap(map);
				//recordDuo.setGroupKey(groupKey);
				recordDuo.setMode(mode);  
				recordDuo.setType(item.getBattle().getType());
				recordDuo.setResultRank(rank.intValue());
				recordDuo.setPlayerName(player.getName());
				recordDuo.setEventId(item.getEvent().getId());
				recordDuo.setBrawlerId(player.getBrawler().getId());
				if (tag.equals(player.getTag())) {
					recordDuo.setTrophyChange(item.getBattle().getTrophyChange());
					myRecord = recordDuo;
				}
				recordDuo.setStatUpdated(false);
				groupRecords.add(recordDuo);
				//recordRepository.save(recordDuo);
				
				//save Statistics
//				if(trophies!= null && trophies >= 500) {
//					saveDuoSoloStat(mode, map, brawlerName, rank);
//				}
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
			recordSolo.setStatUpdated(false);
			groupRecords.add(recordSolo);
			//recordRepository.save(recordSolo);
			
			//save Statistics
//			if(recordSolo.getTrophies()!= null && recordSolo.getTrophies() >= 500) {
//				saveDuoSoloStat(recordSolo.getMode(), recordSolo.getMap(), recordSolo.getBrawlerName(), Long.valueOf(recordSolo.getResultRank()));
//			}
		}
		Record.setRelation(myRecord, groupRecords);
		recordRepository.save(myRecord);
	}

	public void savePlayers(String tag) {
		List<Item> items;
		try {
			items = brawlStarsAPI.getItems(tag);
			savePlayersInItems(items);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void savePlayersInItems(List<Item> items) {
		
		items.stream().forEach(item -> {
			List<List<Player>> teams = item.getBattle().getTeams();
			List<Player> players;
			if (teams != null)
				players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
			else
				players = item.getBattle().getPlayers();

			for (int i = 0; i < players.size(); i++) {
				Player player = players.get(i);
				MemberDto foundMember = memberRepository.findMemberByTag(player.getTag());
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
		

	}

	public void saveBattleLog(List<Item> items, String tag) {
		items.stream().forEach(item -> {
			System.out.println(item.getBattleTime());
			if (CommonUtil.isTrioMode(item.getEvent().getMode())) {
				saveTrio(tag, item);
			} else if (CommonUtil.isDuo(item.getEvent().getMode())) {
				saveDuo(tag, item);
			} else if (CommonUtil.isSolo(item.getEvent().getMode())) {
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
		if(CommonUtil.isTrioMode(mode)) {
			return recordRepository.findByMap(recordSearch);
		}else if(CommonUtil.isDuo(mode) || CommonUtil.isSolo(mode)) {
			return recordRepository.findSoloDuoByMap(recordSearch);
		}else if(CommonUtil.isAll(mode)) {
			return recordRepository.findAllResult(recordSearch);
		}
		
		return null;
	}

	public List<GameMapDto> getDistinctGameMaps(String mode){
		return recordRepository.getDistinctGameMaps(mode);
	}

	public int saveDistinctGameMap(String mode) {
		// TODO Auto-generated method stub
		List<GameMapDto> gameMapDtos = getDistinctGameMaps(mode);
		List<GameMap> gameMaps = gameMapDtos.stream().map(dto ->{
			GameMap gameMap = new GameMap();
			gameMap.setMode(dto.getMode());
			gameMap.setName(dto.getName());
			return gameMap;
		}).collect(Collectors.toList());
		
		List<FindMapDto> notSavedMaps = gameMaps.stream()
				.filter(gameMap -> gameMap.getName()!= null)
				.map(gameMap -> new FindMapDto(gameMap, gameMapRepositry.findByNameAndMode(gameMap.getName(), mode)))
				.filter(findMapDtos -> findMapDtos.gameMapDtos.isEmpty())
				.collect(Collectors.toList());
		
		notSavedMaps.stream().forEach(findMapDtos -> gameMapRepositry.saveGameMap(findMapDtos.gameMap));
				
		return notSavedMaps.size();
	}
	
	public void deleteOldRecords(String tag, Long offset) {
		// TODO Auto-generated method stub
		recordRepository.deleteOldRecords(tag, offset); 
	}
	
	class FindMapDto{
		GameMap gameMap;
		List<GameMapDto> gameMapDtos; 
		public FindMapDto(GameMap gameMap, List<GameMapDto> gameMapDtos ) {
			this.gameMap = gameMap;
			this.gameMapDtos = gameMapDtos;
		}
	}

	

	public void saveTrioStat(String mode, String map, String brawlerName, String result, Integer cnt) {
		Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerNameAndResult(mode, map, brawlerName, result);
		if(statistics == null) {
			statistics = new Statistics();
			statistics.setMode(mode);
			statistics.setMap(map);
			statistics.setBrawlerName(brawlerName);
			statistics.setResult(result);
			statistics.setCnt(Long.valueOf(cnt));
			statisticsRepository.save(statistics);
		}else {
			statistics.setCnt(statistics.getCnt() + cnt);
		}
	}
	public void saveDuoSoloStat(String mode, String map, String brawlerName, Long rank, Integer cnt) {
		try {
		Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerName(mode, map, brawlerName);
		if(statistics == null) {
			statistics = new Statistics();
			statistics.setMode(mode);
			statistics.setMap(map);
			statistics.setBrawlerName(brawlerName);
			statistics.setRankSum(rank);
			statistics.setCnt(Long.valueOf(cnt));
			statisticsRepository.save(statistics);
		}else {
			statistics.setCnt(statistics.getCnt() + cnt);
			statistics.setRankSum(statistics.getRankSum() + rank);
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}


	public void saveStats() {
		// TODO Auto-generated method stub
		List<GameMapDto> modes = recordRepository.getDistinctModes();
		for(GameMapDto gameMode : modes) {			
			saveDistinctGameMap(gameMode.getMode());
		}
		List<GameMapDto> maps = gameMapRepositry.getGameMaps(null);
		maps.stream().forEach(map ->{
			String mode = map.getMode();
			RecordSearch recordSearch = new RecordSearch();
			recordSearch.setMode(mode);
			recordSearch.setMap(map.getName());
			recordSearch.setTrophyRange("highRank");
			recordSearch.setStatUpdated(false);
			List<RecordResultDto> stats;
			if(CommonUtil.isTrioMode(map.getMode())) {
				stats = recordRepository.findByMap(recordSearch);
				recordRepository.updateStatUpdated(recordSearch);
				for(RecordResultDto stat : stats) {
					saveTrioStat(mode, map.getName(), stat.getBrawlerName(),  stat.getResult(), stat.getCnt().intValue());
				};
			}else {
				stats = recordRepository.findSoloDuoByMap(recordSearch);
				recordRepository.updateStatUpdated(recordSearch);
				for(RecordResultDto stat : stats) {
					saveDuoSoloStat(mode, map.getName(), stat.getBrawlerName(), Long.valueOf(stat.getRankSum()), stat.getCnt().intValue());
				}
			}
		});
	}

}
