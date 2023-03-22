package com.brawlstars.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("Duels")
@Getter
@Setter
public class RecordDuels extends Record {

}
