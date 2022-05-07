package com.brawlstars.schedule;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.brawlstars.api.BrawlStarsAPI;
import com.brawlstars.json.Item;
import com.brawlstars.repository.MemberDto;
import com.brawlstars.repository.MemberRepository;
import com.brawlstars.service.RecordService;

@Component
public class RecordSchedule {

  @Autowired
  BrawlStarsAPI brawlStarsAPI;

  @Autowired
  RecordService recordService;

  @Autowired
  MemberRepository memberRepository;

  Logger logger = LoggerFactory.getLogger(RecordSchedule.class);

  // 30 minutes
  @Scheduled(fixedDelay = 3600_000
      , initialDelay = 360_000 // 10 minutes
  )
  public void saveRecordsSchedule() {
    saveRecords();
  }

  public void saveRecords() {
    List<String> tags = memberRepository.findTags();
    tags.stream().parallel().forEach(tag -> {
      logger.info("save member tag : " + tag);
      saveRecord(tag);
    });
  }

  public void saveRecordsV1(int page, int pageSize) {
    Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(page, pageSize));
    members.getContent().stream().parallel().forEach(member -> {
      String tag = member.getTag();
      List<Item> items = null;
      try {
        items = brawlStarsAPI.getItems(member.getTag());
        recordService.saveBattleLog(items, tag);
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  @Getter
  @Setter
  class ItemContainer {

    List<Item> items;
    String tag;
  }

  public void saveRecordsV2(int page, int pageSize, Executor executor) {
    Page<MemberDto> members = memberRepository.findAll("", PageRequest.of(page, pageSize));
    List<CompletableFuture<Object>> itemFutures = members.getContent()
        .stream()
        .map(member ->
            CompletableFuture.supplyAsync(() -> {
              String tag = member.getTag();
              //logger.info("save member : " + member.getName() + " tag : " + tag);
              List<Item> items = null;
              ItemContainer itemContainer = new ItemContainer();
              try {
                items = brawlStarsAPI.getItems(member.getTag());
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

    List<Item> items;
    try {
      items = brawlStarsAPI.getItems(tag);
      recordService.saveBattleLog(items, tag);
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  // This lefts recent 50 records,and delete old records.
  @Scheduled(fixedDelay = 86400_000 // 1 day
      // ,initialDelay = 60000 // 10 minutes
  )
  public void deleteRecords() {
    logger.info("deleteRecords");
    List<String> tags = memberRepository.findTags();
    tags.forEach(tag -> {
      logger.debug("delete member : " + tag);
      recordService.deleteOldRecords(tag, 50L);
    });
  }

  //every hour
  //@Scheduled(cron = "0 15 * * * *")
  @Scheduled(fixedDelay = 1800_000) // 30minutes
  public void updateStatistics() {
    recordService.saveStats();
  }
}
