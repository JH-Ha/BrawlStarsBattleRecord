package com.brawlstars.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("TRIO")
@Getter
@Setter
public class RecordTrio extends Record {

	
}
