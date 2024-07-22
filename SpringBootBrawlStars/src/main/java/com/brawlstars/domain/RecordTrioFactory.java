package com.brawlstars.domain;

public class RecordTrioFactory implements RecordFactory {

    @Override
    public Record create() {
        return new RecordTrio();
    }
}
