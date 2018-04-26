package org.qs.air.rest.client;

import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.InvocationCallback;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.client.jaxrs.BasicAuthentication;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.qs.air.api.core.entities.AirMetric;

public class AirQSRestClient {

	// public static void main(String[] args) throws Exception {
	//
	// trySyncRestEasyClient();
	// tryAsyncRestEasyClient();
	//
	// }

	public static AirMetric CreateMetricSyncRestEasy(AirMetric am, String url, String user, String pass) {
		ResteasyClient client = new ResteasyClientBuilder().disableTrustManager().build();

		BasicAuthentication bauth = new BasicAuthentication(user, pass);
		client.register(bauth);

		ResteasyWebTarget endpoint = client.target(url + "/api/v1/am");

		Builder reqBuilder = endpoint.request().accept(MediaType.APPLICATION_JSON).header("Content-Type",
				MediaType.APPLICATION_JSON);

		Response response = reqBuilder.post(Entity.json(am));

		AirMetric registeredAM = response.readEntity(AirMetric.class);

		System.out.println(registeredAM.toString());

		return registeredAM;
	}

	private static void tryAsyncRestEasyClient() {
		ResteasyClient client = new ResteasyClientBuilder().disableTrustManager().build();

		BasicAuthentication bauth = new BasicAuthentication("user1", "pass2");
		client.register(bauth);

		ResteasyWebTarget athenticate = client.target("https://localhost:8443/repository/api/v1/folder/all");

		Builder reqBuilder = athenticate.request().accept(MediaType.APPLICATION_JSON).header("Content-Type",
				MediaType.APPLICATION_JSON);

		reqBuilder.async().get(new InvocationCallback<AirMetric[]>() {

			@Override
			public void completed(AirMetric[] response) {
				for (AirMetric fo : response) {
					System.out.println(fo.toString());
				}
			}

			@Override
			public void failed(Throwable throwable) {
				throwable.printStackTrace();
			}
		});
	}
}
