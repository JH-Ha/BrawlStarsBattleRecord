package com.brawlstars.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("DUO")
@Getter
@Setter
public class RecordDuo extends Record {

}
