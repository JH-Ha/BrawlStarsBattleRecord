package com.brawlstars.cache;

import org.springframework.cache.interceptor.KeyGenerator;

import java.lang.reflect.Method;
import java.util.List;

public class StatsKeyGenerator implements KeyGenerator {
    final private String DELIMITER = "_";

    public String makeKey(String mode, String map, List<String> yearMonth) {
        if (yearMonth != null && !yearMonth.isEmpty()) {
            return String.join(DELIMITER, mode, map, String.join(DELIMITER, yearMonth));
        } else {
            return String.join(DELIMITER, mode, map);
        }
    }

    @Override
    public Object generate(Object target, Method method, Object... params) {
        String mode = (String) params[0];
        String map = (String) params[1];
        List<String> yearMonth = (List<String>) params[2];

        return makeKey(mode, map, yearMonth);
    }
}
