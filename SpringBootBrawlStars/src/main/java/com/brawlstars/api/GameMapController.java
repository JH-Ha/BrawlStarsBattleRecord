package com.brawlstars.api;

import com.brawlstars.repository.GameMapDto;
import com.brawlstars.repository.GameMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameMapController {

    @Autowired
    GameMapRepository gameMapRepository;

    @GetMapping("/gameMap")
    public List<GameMapDto> getGameMaps(@RequestParam("mode") String mode) {
        return gameMapRepository.getGameMaps(mode);
    }
}