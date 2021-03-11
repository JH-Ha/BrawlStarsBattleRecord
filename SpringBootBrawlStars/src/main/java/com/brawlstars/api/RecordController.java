package com.brawlstars.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.domain.Record;
import com.brawlstars.repository.RecordDto;
import com.brawlstars.service.RecordService;

@RestController
public class RecordController {

	@Autowired
	RecordService recordService;
	
	@GetMapping("/record/{tag}")
	public List<RecordDto> getRecords(@PathVariable(name="tag") String tag) {
		List<Record> records = recordService.getFindByTag(tag);
		List<RecordDto> recordDtos = records.stream().map(record -> new RecordDto(record))
		.collect(Collectors.toUnmodifiableList());
		return recordDtos;
	}

	/*
	 * @GetMapping("/record/save/{tag}") public String
	 * saveRecords(@PathVariable(name = "tag") String tag) {
	 * 
	 * }
	 */
	@GetMapping("/record/save/players/{tag}")
	public void savePlayers(@PathVariable(name="tag") String tag) {
		recordService.savePlayers(tag);
	}


}
