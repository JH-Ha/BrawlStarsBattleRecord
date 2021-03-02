package com.brawlstars.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brawlstars.service.RecordService;

@RestController
public class RecordController {

	@Autowired
	RecordService recordService;
	
	@GetMapping("/record/{tag}")
	public List<RecordDto> getRecords() {
		// List<RecordDto> recordDtos = null;
		return null;
	}

	/*
	 * @GetMapping("/record/save/{tag}") public String
	 * saveRecords(@PathVariable(name = "tag") String tag) {
	 * 
	 * }
	 */

	class RecordDto {

	}
}
