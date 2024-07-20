package com.brawlstars.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("PENTA")
@Getter
@Setter
public class RecordPenta extends Record{

}
