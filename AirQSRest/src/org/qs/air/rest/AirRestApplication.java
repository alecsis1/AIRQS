package org.qs.air.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.qs.air.rest.repository.AirMetricLocationResource;
import org.qs.air.rest.repository.AirMetricResource;

@ApplicationPath("/rest")
public class AirRestApplication extends Application {
	private Set<Object> singletons = new HashSet<Object>();
	private Set<Class<?>> classes = new HashSet<Class<?>>();

	public AirRestApplication() {

		// Repository
		classes.add(AirMetricResource.class);
		classes.add(AirMetricLocationResource.class);

	}

	@Override
	public Set<Class<?>> getClasses() {
		return classes;
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
