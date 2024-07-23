package com.brawlstars.api;

import com.brawlstars.domain.RecordSearch;
import com.brawlstars.json.Item;
import com.brawlstars.remote.BrawlStarsApiService;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecordController {

    Logger logger = LoggerFactory.getLogger(RecordController.class);

    @Autowired
    RecordService recordService;

    @Autowired
    BrawlStarsApiService brawlStarsApiService;

    @GetMapping("/record/{tag}")
    public Page<RecordDto> getRecords(@PathVariable(name = "tag") String tag,
                                      Pageable pageable,
                                      RecordSearch recordSearch) {
        Page<RecordDto> recordDtos = recordService.findByTag(tag, pageable, recordSearch);
        return recordDtos;
    }

    @GetMapping("/v2/record/{tag}")
    public Page<RecordDto> getRecordsFromApiServer(@PathVariable(name = "tag") String tag,
                                                   Pageable pageable,
                                                   RecordSearch recordSearch) throws Exception {
        List<Item> item = brawlStarsApiService.getItems(tag);
        Page<RecordDto> recordDtos = recordService.findByTag(tag, pageable, recordSearch);
//		new PageImpl<>(item.stream()
//				.map(record -> new RecordDto(record))
//				.collect(Collectors.toList()),
//				pageable,
//				item.size());
        return recordDtos;
    }

    /*
     * @GetMapping("/record/save/{tag}") public String
     * saveRecords(@PathVariable(name = "tag") String tag) {
     *
     * }
     */
    @GetMapping("/record/save/players/{tag}")
    public void savePlayers(@PathVariable(name = "tag") String tag) {
        recordService.savePlayers(tag);
    }

    @GetMapping("/record/result")
    public List<RecordResultDto> getRecordResults(RecordSearch recordSearch) {
        List<RecordResultDto> records = recordService.findByMap(recordSearch);
        return records;
    }

    @GetMapping("/record/save/map/{mode}")
    public void saveDistinctMap(@PathVariable(name = "mode") String mode) {
        recordService.saveDistinctGameMap(mode);
    }

}
