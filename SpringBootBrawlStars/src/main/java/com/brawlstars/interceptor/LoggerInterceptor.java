package com.brawlstars.interceptor;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.brawlstars.domain.AccessHistory;
import com.brawlstars.service.AccessHistoryService;

public class LoggerInterceptor implements HandlerInterceptor {
	@Autowired
	AccessHistoryService accessHistoryService;
	
	@Override
	public
	boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
				
		ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
		//Date nowSeoul = Date.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toInstant());				
		
		String ip = request.getRemoteAddr();
		String url = request.getRequestURL().toString();
		String queryString = request.getQueryString();
		String userAgent = request.getHeader("User-Agent");
		
		if(queryString != null) {
			url += "/" + queryString;
		}
		if(url.length() > 255)
			url = url.substring(0,254);
		
		AccessHistory accessHistory = AccessHistory.createHistory(ip, url, nowSeoul, userAgent);
		accessHistoryService.saveAccessHistory(accessHistory);
		
		return true;
	}
	
}
