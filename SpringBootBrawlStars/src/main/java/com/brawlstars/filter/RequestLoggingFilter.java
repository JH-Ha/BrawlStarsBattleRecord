package com.brawlstars.filter;


import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@WebFilter(urlPatterns = "/*")
public class RequestLoggingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        ContentCachingRequestWrapper req = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper res = new ContentCachingResponseWrapper(response);

        filterChain.doFilter(req, res);

        String reqBody = new String(req.getContentAsByteArray(), StandardCharsets.UTF_8);
        String resBody = new String(res.getContentAsByteArray(), StandardCharsets.UTF_8);
        Map<String, String[]> parameterMap = request.getParameterMap();
        String queryParams = parameterMap.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + String.join(",", entry.getValue()))
                .collect(Collectors.joining(", "));


        res.copyBodyToResponse();
        log.info("(remoteAddr: {}, method: {}, status: {}, path: {}, params: {}, reqBody: {}, resBody: {})",
                req.getRemoteAddr(), req.getMethod(), res.getStatus(), req.getRequestURI(), queryParams, reqBody, resBody);
    }

    @Override
    public void destroy() {
    }
}