package com.brawlstars.schedule;

import com.brawlstars.json.Item;
import com.brawlstars.remote.BrawlStarsApiService;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.service.MemberService;
import com.brawlstars.service.RecordService;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

@Component
public class RecordSchedule {

    @Autowired
    BrawlStarsApiService brawlStarsApiService;

    @Autowired
    RecordService recordService;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    Logger logger = LoggerFactory.getLogger(RecordSchedule.class);

    // every hour
    @Scheduled(cron = "0 0 * * * *")
    public void saveRecordsSchedule() {
        saveRecords();
    }

    public void saveRecords() {
        List<String> tags = memberRepository.findTags();
        tags.stream().forEach(tag -> {
            logger.info("save member tag : " + tag);
            saveRecord(tag);
        });
    }

    public void saveRecordsV1(int page, int pageSize) {
        Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(page, pageSize));
        members.getContent().stream().parallel().forEach(member -> {
            String tag = member.getTag();
            List<Item> items;
            try {
                items = brawlStarsApiService.getItems(member.getTag());
                recordService.saveBattleLog(items, tag);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void saveRecordsV2(int page, int pageSize, Executor executor) {
        Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(page, pageSize));
        List<CompletableFuture<Object>> itemFutures = members.getContent()
                .stream()
                .map(member ->
                        CompletableFuture.supplyAsync(() -> {
                            String tag = member.getTag();
                            //logger.info("save member : " + member.getName() + " tag : " + tag);
                            List<Item> items;
                            ItemContainer itemContainer = new ItemContainer();
                            try {
                                items = brawlStarsApiService.getItems(member.getTag());
                                itemContainer.setItems(items);
                                itemContainer.setTag(tag);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                            return itemContainer;
                        }, executor))
                .map(future ->
                        CompletableFuture.supplyAsync(() -> {
                            try {
                                ItemContainer itemContainer = future.get();
                                if (itemContainer.getItems() != null) {
                                    recordService.saveBattleLog(itemContainer.getItems(), itemContainer.getTag());
                                }
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            } catch (ExecutionException e) {
                                e.printStackTrace();
                            }
                            return null;
                        }, executor))
                .collect(Collectors.toList());
        itemFutures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    public void saveRecord(String tag) {
        try {
            List<Item> items = getItems(tag);
            recordService.saveBattleLog(items, tag);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Item> getItems(String tag) {
        try {
            List<Item> items = brawlStarsApiService.getItems(tag);
            return items;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // This scheduler lefts recent 25 records,and delete old records.
    @Scheduled(cron = "0 0 9 * * *")
    public void deleteRecords() {
        logger.info("deleteRecords");
        List<String> tags = memberRepository.findTags();
        tags.forEach(tag -> {
            logger.debug("delete member : " + tag);
            recordService.deleteOldRecords(tag, 25L);
        });
    }

    //every 30 minutes
    @Scheduled(cron = "0 30 * * * *")
    public void updateStatistics() {
        recordService.saveStats();
    }

    @Getter
    @Setter
    class ItemContainer {

        List<Item> items;
        String tag;
    }
}
