package com.brawlstars.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EventDomain {

  @Id
  @GeneratedValue
  @Column(name = "event_domain_id")
  private Long id;
  private String eventId;
  private String mode;
  private String map;
}
