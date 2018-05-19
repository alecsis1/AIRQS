package org.qs.air.rest.client;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.InvocationCallback;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.client.jaxrs.BasicAuthentication;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.qs.air.api.core.entities.AirMetric;

public class AirQSRestClient {

	private static final ResteasyClient client = new ResteasyClientBuilder().disableTrustManager().build();

	public static void main(String[] args) throws Exception {

		String token = getToken();

		// Add test entity to the cloud db
		ResteasyWebTarget endpoint = client.target("https://airqs.symmetry-apps.org/rest" + "/api/v1/am");
		Builder reqBuilder = endpoint.request().accept(MediaType.APPLICATION_JSON)
				.header("Content-Type", MediaType.APPLICATION_JSON).header("Authorization", "Bearer " + token);

		AirMetric am = new AirMetric();
		am.setHum(1.1);
		am.setMq135(2.2);
		am.setMq2(3.3);
		am.setMq3(4.4);
		am.setMq7(5.5);
		am.setPressure(6.6);
		am.setLat(44.234D);
		am.setLng(23.235456576D);
		am.setTemp(7.7);
		am.setTimestamp(System.currentTimeMillis());
		am.setName("Test01AM");
		Response response = reqBuilder.post(Entity.json(am));
		AirMetric registeredAM = response.readEntity(AirMetric.class);

		System.out.println(registeredAM.toString());

		endpoint = client.target("https://airqs.symmetry-apps.org/rest" + "/api/v1/am/all");

		reqBuilder = endpoint.request().accept(MediaType.APPLICATION_JSON)
				.header("Content-Type", MediaType.APPLICATION_JSON).header("Authorization", "Bearer " + token);

		response = reqBuilder.get();

		AirMetric[] items = response.readEntity(AirMetric[].class);
		System.out.println(items.length);
	}

	private static String getToken() {
		Properties prop = new Properties();
		InputStream in = null;
		String user = null, pass = null;
		try {

			in = new FileInputStream("config.properties");
			prop.load(in);

			user = prop.getProperty("user", "");
			pass = prop.getProperty("password", "");

		} catch (IOException io) {
			io.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		ResteasyWebTarget endpoint = client
				.target("https://airqs.symmetry-apps.org/auth/realms/Google-Auth/protocol/openid-connect/token");

		Builder reqBuilder = endpoint.request().header("Content-Type", "application/x-www-form-urlencoded");
		Form form = new Form();
		form.param("grant_type", "password").param("username", user).param("password", pass).param("client_id",
				"AirQS");
		Entity<Form> entity = Entity.form(form);
		Response response = reqBuilder.post(entity);

		TokenModel output = response.readEntity(TokenModel.class);

		return output.getAccess_token();
	}

	public static AirMetric CreateMetricSyncRestEasy(AirMetric am, String url, String user, String pass) {
		ResteasyClient client = new ResteasyClientBuilder().disableTrustManager().build();

		BasicAuthentication bauth = new BasicAuthentication(user, pass);
		client.register(bauth);

		ResteasyWebTarget endpoint = client.target(url + "/api/v1/am");
		String token = getToken();
		Builder reqBuilder = endpoint.request().accept(MediaType.APPLICATION_JSON)
				.header("Content-Type", MediaType.APPLICATION_JSON).header("Authorization", "Bearer " + token);

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
