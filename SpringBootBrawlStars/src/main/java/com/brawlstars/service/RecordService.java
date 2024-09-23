package com.brawlstars.service;

import com.brawlstars.domain.Record;
import com.brawlstars.domain.*;
import com.brawlstars.json.Brawler;
import com.brawlstars.json.Item;
import com.brawlstars.json.Player;
import com.brawlstars.remote.BrawlStarsApiService;
import com.brawlstars.repository.*;
import com.brawlstars.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RecordService {

    private static RecordPentaFactory recordPentaFactory = new RecordPentaFactory();
    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private GameMapRepository gameMapRepositry;
    @Autowired
    private BrawlStarsApiService brawlStarsApiService;

    public static String getOppositeResult(String result) {
        if ("defeat".equals(result)) {
            return "victory";
        } else if ("victory".equals(result)) {
            return "defeat";
        }
        return result;
    }

    public Date makeBattleTimeDate(String battleTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd'T'HHmmss.SSS'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        Date battleTimeDate = null;
        try {
            battleTimeDate = sdf.parse(battleTime);
            System.out.println(battleTimeDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return battleTimeDate;
    }

    public String makeGroupKey(List<Player> players, String battleTime) {
        players.sort(Comparator.comparing(Player::getTag));
        // make team key to get team record
        String groupKey = players.stream().map(Player::getTag).reduce("", (a, b) -> a + b);
        groupKey += battleTime;
        return groupKey;
    }

    public void saveTrio(String tag, Item item) {
        List<List<Player>> teams = item.getBattle().getTeams();

        String brawlerName = null;
        int playerGroupIdx = 0;
        for (int i = 0; i < teams.size(); i++) {
            List<Player> team = teams.get(i);
            for (Player player : team) {
                if (player.getTag().equals(tag)) {
                    playerGroupIdx = i;
                    brawlerName = player.getBrawler().getName();
                    break;
                }
            }
        }

//    Record foundRecord = recordRepository.findOne(tag, item.getBattleTime(), brawlerName);
//    if (foundRecord != null) {
//      foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
//      return;
//    }

        Record myRecord = null;
        List<Record> groupRecords = new ArrayList<>();

        for (int i = 0; i < teams.size(); i++) {
            List<Player> team = teams.get(i);
            for (Player player : team) {
                RecordTrio recordTrio = RecordTrio.createRecord(item, tag, player, playerGroupIdx, i);
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

    public void saveDuoShowdown(String tag, Item item) {

        List<List<Player>> teams = item.getBattle().getTeams();
        String myBrawlerName = null;
        for (List<Player> team : teams) {
            for (Player player : team) {
                if (tag.equals(player.getTag())) {
                    myBrawlerName = player.getBrawler().getName();
                    break;
                }
            }
        }
        if (tag == null || item.getBattleTime() == null || myBrawlerName == null) {
            log.info("One of is null -> tag : " + tag + " battleTime : " + item.getBattleTime()
                    + " myBrawlerName : " + myBrawlerName);
            return;
        }
        // if there is a saved record already, then just update throphychange
//    Record foundRecord = recordRepository.findOne(tag, item.getBattleTime(), myBrawlerName);
//    if (foundRecord != null) {
//      foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
//      recordRepository.save(foundRecord);
//      return;
//    }

        Record myRecord = null;
        List<Record> groupRecords = new ArrayList<>();

        for (int i = 0; i < teams.size(); i++) {
            List<Player> team = teams.get(i);
            for (Player player : team) {
                RecordDuo recordDuo = RecordDuo.createDuo(tag, player, item, i + 1);
                if (tag.equals(player.getTag())) {
                    myRecord = recordDuo;
                }
                groupRecords.add(recordDuo);
            }
        }
        Record.setRelation(myRecord, groupRecords);
        recordRepository.save(myRecord);
    }

    public void saveSolo(String tag, Item item) {

        List<Player> players = item.getBattle().getPlayers();
        String myBrawlerName = null;
        for (Player player : players) {
            if (tag.equals(player.getTag())) {
                myBrawlerName = player.getBrawler().getName();
                break;
            }
        }
        if (tag == null || item.getBattleTime() == null || myBrawlerName == null) {
            return;
        }
//    Record foundRecord = recordRepository.findOne(tag, item.getBattleTime(), myBrawlerName);
//    if (foundRecord != null) {
//      foundRecord.setTrophyChange(item.getBattle().getTrophyChange());
//      recordRepository.save(foundRecord);
//      return;
//    }

        Record myRecord = null;
        List<Record> groupRecords = new ArrayList<>();
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            RecordSolo recordSolo = RecordSolo.createSoloRecord(tag, item, player, i + 1);
            if (tag.equals(player.getTag())) {
                myRecord = recordSolo;
            }
            groupRecords.add(recordSolo);
        }
        Record.setRelation(myRecord, groupRecords);
        recordRepository.save(myRecord);
    }

    public void savePlayers(String tag) {
        List<Item> items;
        try {
            items = brawlStarsApiService.getItems(tag);
            savePlayersInItems(items);
        } catch (Exception e) {
            log.warn("failed to savePlayers", e);
        }
    }

    public void savePlayersInItems(List<Item> items) {

        items.forEach(item -> {
            List<List<Player>> teams = item.getBattle().getTeams();
            List<Player> players;
            if (teams != null) {
                players = teams.stream().flatMap(Collection::stream).collect(Collectors.toList());
            } else {
                players = item.getBattle().getPlayers();
            }

            for (Player player : players) {
                MemberDto foundMember = memberRepository.findMemberByTag(player.getTag());
                if (foundMember != null) {
                    continue;
                }
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
        for (Item item : items) {
            String battleTime = item.getBattleTime();

            // When records already exist, we don't check left items to reduce execution time.
            List<Long> ids = recordRepository.findIdsByTagAndBattleTime(tag, battleTime);
            if (ids.size() > 0) {
                break;
            }

            // event.mode and battle.mode are different when event is trophyEscape
            // use event first and then battle.mode
            String mode = Optional.ofNullable(item.getEvent().getMode())
                    .orElse(item.getBattle().getMode());
            if (CommonUtil.isTrioMode(mode)) {
                saveTrio(tag, item);
            } else if (CommonUtil.isDuoShowdown(mode)) {
                saveDuoShowdown(tag, item);
            } else if (CommonUtil.isSolo(mode)) {
                saveSolo(tag, item);
            } else if (CommonUtil.isDuels(mode)) {
                saveDuels(tag, item);
            } else if (CommonUtil.isPentaMode(mode)) {
                savePenta(tag, item);
            } else {
                log.warn("unknown mode : {}", mode);
            }
        }
    }

    public Page<RecordDto> findByTag(String tag, Pageable pageable, RecordSearch recordSearch) {
        Page<RecordDto> records = recordRepository.findByTag(tag, pageable, recordSearch);
        return records;
    }

    public void save(Record record) {
        recordRepository.save(record);
    }

    public long removeByTag(String tag) {
        return recordRepository.removeByTag(tag);
    }

    public List<RecordResultDto> findByMap(RecordSearch recordSearch) {
        String mode = recordSearch.getMode();
        if (CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode) || CommonUtil.isPentaMode(mode)) {
            return recordRepository.findByMap(recordSearch);
        } else if (CommonUtil.isDuoShowdown(mode) || CommonUtil.isSolo(mode)) {
            return recordRepository.findSoloDuoByMap(recordSearch);
        } else if (CommonUtil.isAll(mode)) {
            return recordRepository.findAllResult(recordSearch);
        }
        log.warn("unknown mode : {}", mode);
        throw new IllegalArgumentException("unknown mode : " + mode);
    }

    public List<GameMapDto> getDistinctGameMaps(String mode) {
        return recordRepository.getDistinctGameMaps(mode);
    }

    public int saveDistinctGameMap(String mode) {
        List<GameMapDto> gameMapDtos = getDistinctGameMaps(mode);
        List<GameMap> gameMaps = gameMapDtos.stream().map(dto -> {
            GameMap gameMap = new GameMap();
            gameMap.setMode(dto.getMode());
            gameMap.setName(dto.getName());
            return gameMap;
        }).toList();

        List<GameMap> notSavedMaps = gameMaps.stream()
                .filter(gameMap -> gameMap.getName() != null)
                .filter(gameMap -> gameMapRepositry.findByNameAndMode(gameMap.getName(), mode).isEmpty())
                .toList();

        notSavedMaps.forEach(gameMap -> gameMapRepositry.saveGameMap(gameMap));

        return notSavedMaps.size();
    }

    public void deleteOldRecords(String tag, Long offset) {
        recordRepository.deleteOldRecords(tag, offset);
    }

    public long getRecordCount() {
        return recordRepository.getRecordCount();
    }

    public long deleteAllRecords() {
        return recordRepository.deleteAllRecord();
    }

    public void saveTrioStat(String mode, String map, String brawlerName, String result, Integer cnt,
                             String yearMonth) {
        Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerNameAndResultAndStatsYearMonth(
                mode, map, brawlerName, result, yearMonth);
        if (statistics == null) {
            statistics = new Statistics();
            statistics.setMode(mode);
            statistics.setMap(map);
            statistics.setBrawlerName(brawlerName);
            statistics.setResult(result);
            statistics.setCnt(Long.valueOf(cnt));
            statistics.setStatsYearMonth(yearMonth);
            statisticsRepository.save(statistics);
        } else {
            statistics.setCnt(statistics.getCnt() + cnt);
        }
    }

    public void saveDuoSoloStat(String mode, String map, String brawlerName, Long rank, Integer cnt,
                                String yearMonth) {
        try {
            Statistics statistics = statisticsRepository.findByModeAndMapAndBrawlerNameAndStatsYearMonth(
                    mode, map,
                    brawlerName, yearMonth);
            if (statistics == null) {
                statistics = new Statistics();
                statistics.setMode(mode);
                statistics.setMap(map);
                statistics.setBrawlerName(brawlerName);
                statistics.setRankSum(rank);
                statistics.setCnt(Long.valueOf(cnt));
                statistics.setStatsYearMonth(yearMonth);
                statisticsRepository.save(statistics);
            } else {
                statistics.setCnt(statistics.getCnt() + cnt);
                statistics.setRankSum(statistics.getRankSum() + rank);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void saveStats() {
        LocalDate localDate = LocalDate.now();
        String yearMonth = localDate.format(DateTimeFormatter.ofPattern("yyyyMM"));

        List<GameMapDto> modes = recordRepository.getDistinctModes();
        for (GameMapDto gameMode : modes) {
            saveDistinctGameMap(gameMode.getMode());
        }
        List<GameMapDto> maps = recordRepository.getNotStatUpdatedModeMap();

        maps.forEach(map -> {
            String mode = map.getMode();
            RecordSearch recordSearch = new RecordSearch();
            recordSearch.setMode(mode);
            recordSearch.setMap(map.getName());
            recordSearch.setTrophyRange("highRank");
            recordSearch.setStatUpdated(false);
            List<RecordResultDto> stats;
            if (CommonUtil.isTrioMode(mode) || CommonUtil.isDuels(mode) || CommonUtil.isPentaMode(mode)) {
                stats = recordRepository.findByMap(recordSearch);
                recordRepository.updateStatUpdated(recordSearch);
                for (RecordResultDto stat : stats) {
                    saveTrioStat(mode, map.getName(), stat.getBrawlerName(), stat.getResult(),
                            stat.getCnt().intValue(), yearMonth);
                }
            } else {
                stats = recordRepository.findSoloDuoByMap(recordSearch);
                recordRepository.updateStatUpdated(recordSearch);
                for (RecordResultDto stat : stats) {
                    saveDuoSoloStat(mode, map.getName(), stat.getBrawlerName(),
                            Long.valueOf(stat.getRankSum()),
                            stat.getCnt().intValue(), yearMonth);
                }
            }
        });
    }

    public void saveDuels(String tag, Item item) {
        // if there is a saved record already, then just update throphychange
        List<Record> foundRecords = recordRepository.findDuelRecords(tag, item.getBattleTime());
        if (foundRecords.size() > 0) {
            return;
        }

        List<Player> players = item.getBattle().getPlayers();

        Record myRecord = null;
        List<Record> groupRecords = new ArrayList<>();

        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            String mode = item.getBattle().getMode(); // event mode -> battle mode : event mode is null
            String map = item.getEvent().getMap();

            List<Brawler> brawlers = player.getBrawlers();
            for (Brawler brawler : brawlers) {
                RecordDuels recordDuels = new RecordDuels();
                recordDuels.setTag(player.getTag());
                recordDuels.setBattleTime(item.getBattleTime());
                recordDuels.setBrawlerName(brawler.getName());
                recordDuels.setPower(brawler.getPower());
                recordDuels.setTrophies(brawler.getTrophies());
                recordDuels.setBrawlerId(brawler.getId());
                recordDuels.setMap(map);
                recordDuels.setMode(mode);
                recordDuels.setType(item.getBattle().getType());
                recordDuels.setPlayerName(player.getName());
                recordDuels.setEventId(item.getEvent().getId());
                recordDuels.setTrophyChange(brawler.getTrophyChange());
                recordDuels.setRecordDate(item.getBattleTime().substring(0, 8));
                recordDuels.setDuration(item.getBattle().getDuration());
                recordDuels.setTeamId(i);

                String result = item.getBattle().getResult();
                if (tag.equals(player.getTag())) {
                    myRecord = recordDuels;
                    recordDuels.setResult(result);
                } else {
                    recordDuels.setResult(getOppositeResult(result));
                }
                recordDuels.setStatUpdated(false);
                groupRecords.add(recordDuels);
            }

        }
        Record.setRelation(myRecord, groupRecords);
        recordRepository.save(myRecord);
    }

    public void savePenta(String tag, Item item) {
        List<List<Player>> teams = item.getBattle().getTeams();

        int playerGroupIdx = 0;
        for (int i = 0; i < teams.size(); i++) {
            List<Player> team = teams.get(i);
            for (Player player : team) {
                if (player.getTag().equals(tag)) {
                    playerGroupIdx = i;
                    break;
                }
            }
        }

        Record myRecord = null;
        List<Record> groupRecords = new ArrayList<>();

        for (int i = 0; i < teams.size(); i++) {
            List<Player> team = teams.get(i);
            for (Player player : team) {
                Record recordTrio = Record.createTeamRecord(recordPentaFactory, item, tag, player,
                        playerGroupIdx, i);
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

    static class FindMapDto {

        GameMap gameMap;
        List<GameMapDto> gameMapDtos;

        public FindMapDto(GameMap gameMap, List<GameMapDto> gameMapDtos) {
            this.gameMap = gameMap;
            this.gameMapDtos = gameMapDtos;
        }
    }

}
