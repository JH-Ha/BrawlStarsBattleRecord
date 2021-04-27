package com.brawlstars.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/*")
public class UrlRewriteFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String requestURL = req.getServerName();
		// for local test
		if(requestURL.contains("localhost")) {
			chain.doFilter(request, response);
		}
		//ip access or 8080 port access go to brawlstat.xyz:80 
		else if(!requestURL.contains("brawlstat.xyz") || req.getServerPort() == 8080) {
			res.sendRedirect("http://brawlstat.xyz" + req.getRequestURI());
		}else {
			chain.doFilter(req, res);
		}		
	}

}
