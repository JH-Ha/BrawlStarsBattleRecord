package com.brawlstars.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.devtools.remote.client.HttpHeaderInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfiguration {

  @Value("${brawl-api.token}")
  private String TOKEN;

  @Bean
  public RestTemplate brawlApiServerRestTemplate() {
    RestTemplate restTemplate = new RestTemplate();
    restTemplate.setInterceptors(
        Arrays.asList(new HttpHeaderInterceptor("Authorization", "Bearer " + TOKEN)));

    ObjectMapper objectMapper = new ObjectMapper().configure(
        DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
        false);

    MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
    messageConverter.setPrettyPrint(false);
    messageConverter.setObjectMapper(objectMapper);

    messageConverter.setObjectMapper(objectMapper);
    restTemplate.getMessageConverters().removeIf(
        m -> m.getClass().getName().equals(MappingJackson2HttpMessageConverter.class.getName()));
    restTemplate.getMessageConverters().add(messageConverter);

    return restTemplate;
  }
}
