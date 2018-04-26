package org.qs.air.wildfly.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(filterName = "GWTCacheControlFilter", urlPatterns = "/*", asyncSupported = true)
public class GWTCacheControlFilter implements Filter {
	public static final int WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
	public static final long WEEK_IN_MILIS = 7L * 24L * 60L * 60L * 1000L;

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String requestURI = httpRequest.getRequestURI();

		// TODO X-XSS-Protection: 1; mode=block
		if (requestURI.contains(".nocache.") || requestURI.contains("cmd=")) {
			long now = System.currentTimeMillis();
			// set create date to current timestamp
			httpResponse.setDateHeader("Date", now);
			// set modify date to current timestamp
			// httpResponse.setDateHeader("Last-Modified", now);
			// set expiry to back in the past (makes us a bad candidate for
			// caching)
			httpResponse.setDateHeader("Expires", 0);
			// HTTP 1.0 (disable caching)
			httpResponse.setHeader("Pragma", "no-cache");
			// HTTP 1.1 (disable caching of any kind)
			// HTTP 1.1 'pre-check=0, post-check=0' => (Internet Explorer should
			// always check)
			// Note: no-store is not included here as it will disable offline
			// application storage on Firefox
			// System.out.println("No-cache-URI:" + requestURI);
			httpResponse.setHeader("Cache-control",
					"no-cache, no-store, max-age=0, must-revalidate, private, pre-check=0, post-check=0");
		} else // if (requestURI.contains(".cache."))
		{
			// set expiry to back in the past (makes us a bad candidate for
			// caching)
			// long now = System.currentTimeMillis();
			// set create date to current timestamp
			// httpResponse.setDateHeader("Date", now);
			// set modify date to current timestamp
			// httpResponse.setDateHeader("Last-Modified", now);
			httpResponse.setHeader("Pragma", "cache");
			// for (String h : httpResponse.getHeaderNames()) {
			// System.out.println("Header: " + httpRequest.getHeader(h));
			// }
			// System.out.println("Cache-URI:" + requestURI);
			httpResponse.setDateHeader("Expires", System.currentTimeMillis() + WEEK_IN_MILIS);
			httpResponse.setHeader("Cache-control", "max-age=" + WEEK_IN_SECONDS + ", public");
			// httpResponse.setHeader("Pragma", "cache");
		}
		httpResponse.setHeader("X-Frame-Options", "SAMEORIGIN");
		httpResponse.setHeader("X-Content-Type-Options", "nosniff");
		filterChain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
