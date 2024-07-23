package com.brawlstars.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class UrlRewriteFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
//		String requestURL = req.getServerName();
//		// for local test
//		if(requestURL.contains("localhost")) {
//			chain.doFilter(request, response);
//		}
//		//ip access or 8080 port access go to brawlstat.xyz:80 
//		else if(!requestURL.contains("brawlstat.xyz") || req.getServerPort() == 8080) {
//			res.sendRedirect("http://brawlstat.xyz" + req.getRequestURI());
//		}else {
//			chain.doFilter(req, res);
//		}
        chain.doFilter(req, res);
    }

}
