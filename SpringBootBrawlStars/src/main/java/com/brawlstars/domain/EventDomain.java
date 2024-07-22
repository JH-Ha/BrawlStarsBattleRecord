package com.brawlstars.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
