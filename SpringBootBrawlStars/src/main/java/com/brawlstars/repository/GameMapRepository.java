package com.brawlstars.repository;

import com.brawlstars.domain.GameMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameMapRepository extends JpaRepository<GameMap, Long>, GameMapRepositoryCustom {
    GameMap findByNameAndModeAndIsDeletedFalse(String name, String mode);
}
