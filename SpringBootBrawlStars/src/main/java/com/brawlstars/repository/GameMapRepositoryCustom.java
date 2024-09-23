package com.brawlstars.repository;

import com.brawlstars.domain.GameMap;

import java.util.List;

public interface GameMapRepositoryCustom {
    List<GameMapDto> findByNameAndMode(String name, String mode);

    List<GameMapDto> getGameMaps(String mode);
}
