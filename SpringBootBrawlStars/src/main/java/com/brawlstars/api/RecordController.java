package com.brawlstars.api;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecordController {

	@GetMapping("/record/{tag}")
	public List<RecordDto> getRecords() {
		// List<RecordDto> recordDtos = null;
		return null;
	}

	@GetMapping("/record/save/{tag}")
	public String saveRecords(@PathVariable(name = "tag") String tag) {
		String baseUrl = "https://api.brawlstars.com/v1/players/";
		try {
			URL url = new URL(baseUrl + tag);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			String temp;
			// while((temp = br))
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}

	class RecordDto {

	}
}
