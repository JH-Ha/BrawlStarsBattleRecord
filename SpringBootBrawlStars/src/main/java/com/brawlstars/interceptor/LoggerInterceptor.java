package com.brawlstars.interceptor;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.brawlstars.domain.AccessHistory;
import com.brawlstars.service.AccessHisotryService;

public class LoggerInterceptor implements HandlerInterceptor {
	@Autowired
	AccessHisotryService accessHisotryService;
	
	@Override
	public
	boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String ip = request.getRemoteAddr();
		String url = request.getRequestURL().toString();
		String queryString = request.getQueryString();
		if(queryString != null) {
			url += "/" + queryString;
		}
		if(url.length() > 255)
			url = url.substring(0,254);
		
		AccessHistory accessHistory = AccessHistory.createHisotry(ip, url, new Date());
		accessHisotryService.saveAccessHistory(accessHistory);
		
		return true;
	}
	
}
