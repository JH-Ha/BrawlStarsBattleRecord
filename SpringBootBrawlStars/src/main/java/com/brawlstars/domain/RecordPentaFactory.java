package com.brawlstars.domain;

public class RecordPentaFactory implements RecordFactory{

  @Override
  public Record create() {
    return new RecordPenta();
  }
}
