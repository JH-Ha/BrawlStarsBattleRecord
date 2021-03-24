package com.brawlstars.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.repository.RecordDto;
import com.brawlstars.repository.RecordResultDto;
import com.brawlstars.service.RecordService;

@RestController
public class RecordController {

	@Autowired
	RecordService recordService;

	@GetMapping("/record/{tag}")
	@CrossOrigin(origins = {"http://localhost:8081", "http://www.brawlstat.xyz:8080"})
	public Page<RecordDto> getRecords(@PathVariable(name = "tag") String tag,
			Pageable pageable) {
		Page<RecordDto> recordDtos = recordService.findByTag(tag, pageable);
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
	
	@GetMapping("/record/map/{map}")
	public List<RecordResultDto> getRecordResults(@PathVariable(name = "map") String map){
		List<RecordResultDto> records = recordService.findByMap(map);
		return records;
	}
	
	@GetMapping("/record/save/map")
	public void saveDistinctMap() {
		recordService.saveDistinctGameMap();
	}

}
