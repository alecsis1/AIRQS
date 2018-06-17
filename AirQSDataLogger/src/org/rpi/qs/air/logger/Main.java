package org.rpi.qs.air.logger;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.qs.air.api.core.entities.AirMetric;
import org.qs.air.rest.client.AirQSRestClient;

import com.fazecast.jSerialComm.SerialPort;

import rpi.sensehat.api.SenseHat;

public class Main {

	private static SerialPort port;
	private static long interval;
	private static String serialPort;

	public static void main(String[] args) throws InterruptedException {

		if (args != null && args.length > 1) {
			interval = Long.valueOf(args[0]);
			serialPort = args[1];
		} else {
			interval = 60000l;
			serialPort = null;
		}

		while (true) {
			SenseHat senseHat = new SenseHat();

			float humidity = senseHat.environmentalSensor.getHumidity();
			System.out.println("Current humidity: " + humidity);

			float pressure = senseHat.environmentalSensor.getPressure();
			System.out.println("Current pressure: " + pressure);

			float temperature = senseHat.environmentalSensor.getTemperature();
			System.out.println("Current temperature: " + temperature);

			senseHat.ledMatrix.clear();

			AirMetric ardMetric = readArdMetric(5, serialPort);
			if (ardMetric != null) {
				ardMetric.setPressure(pressure);
				ardMetric.setTemp((ardMetric.getTemp() + temperature) / 2D);
				ardMetric.setHum((ardMetric.getHum() + humidity) / 2D);
				ardMetric = AirQSRestClient.CreateMetricSyncRestEasy(ardMetric, "https://airqs.symmetry-apps.org/rest");
				System.out.println(ardMetric.toString());
			} else {
				System.out.println("Missing serial port.");
			}
			Thread.sleep(interval);
		}
	}

	private static AirMetric readArdMetric(int precision, String comPort) throws InterruptedException {

		SerialPort serialPorts[] = SerialPort.getCommPorts();
		port = null;
		if (serialPorts.length == 1) {
			port = serialPorts[0];
		}
		if (port == null && comPort != null) {
			port = SerialPort.getCommPort(comPort);
		}
		if (port == null) {
			return null;
		}
		port.setBaudRate(9600);
		port.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 1000, 0);
		boolean opened = port.openPort();
		System.out.println("Port opened: " + opened + ", port name: " + port.getSystemPortName());

		AirMetric resultAirMetric = new AirMetric();

		Thread.sleep(1000);
		resultAirMetric.setName("ARD-METRIC");
		resultAirMetric.setTimestamp(System.currentTimeMillis());
		try {
			InputStream in = port.getInputStream();
			StringBuilder sb = new StringBuilder();
			boolean done = false;
			while (!done) {
				int bytesAvailable = in.available();
				if (bytesAvailable > 0) {
					final byte[] packetBytes = new byte[bytesAvailable];
					in.read(packetBytes);
					sb.append(new String(packetBytes));
					if (sb.toString().split("\n").length > precision) {
						done = true;
					}
				}
				Thread.sleep(50);
			}
			List<AirMetric> ams = new ArrayList<>();
			String[] result_samples = sb.toString().split("\n");
			for (String result : result_samples) {
				AirMetric am = new AirMetric();
				am.setName("ARD-METRIC");
				am.setTimestamp(System.currentTimeMillis());
				String[] data = result.split(";");
				if (data.length == 6) {
					int data_to_set = 0;
					for (String info : data) {
						String[] metric = info.split("=");
						if (metric.length > 1) {
							switch (metric[0]) {
							case "MQ3":
								try {
									am.setMq3(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setMq3(0);
								}
								break;
							case "MQ135":
								try {
									am.setMq135(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setMq135(0);
								}
								break;
							case "MQ2":
								try {
									am.setMq2(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setMq2(-1);
								}
								break;
							case "MQ7":
								try {
									am.setMq7(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setMq7(-1);
								}
								break;
							case "TEMP":
								try {
									am.setTemp(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setTemp(-1);
								}
								break;
							case "HUMIDITY":
								try {
									am.setHum(Double.parseDouble(metric[1]));
								} catch (Exception e) {
									am.setHum(-1);
								}
								break;

							default:
								break;
							}
							data_to_set++;
						}
					}
					if (data_to_set == 6) {
						ams.add(am);
					}
				}
			}

			int mq135 = 0;
			int mq2 = 0;
			int mq3 = 0;
			int mq7 = 0;
			int temp = 0;
			int hum = 0;
			for (AirMetric am : ams) {
				if (am.getMq135() != -1D) {
					resultAirMetric.setMq135(resultAirMetric.getMq135() + am.getMq135());
					mq135++;
				}
				if (am.getMq2() != -1D) {
					resultAirMetric.setMq2(resultAirMetric.getMq2() + am.getMq2());
					mq2++;
				}
				if (am.getMq3() != -1D) {
					resultAirMetric.setMq3(resultAirMetric.getMq3() + am.getMq3());
					mq3++;
				}
				if (am.getMq7() != -1D) {
					resultAirMetric.setMq7(resultAirMetric.getMq7() + am.getMq7());
					mq7++;
				}
				if (am.getTemp() != -1D) {
					resultAirMetric.setTemp(resultAirMetric.getTemp() + am.getTemp());
					temp++;
				}
				if (am.getHum() != -1D) {
					resultAirMetric.setHum(resultAirMetric.getHum() + am.getHum());
					hum++;
				}
			}
			resultAirMetric.setMq135(resultAirMetric.getMq135() / mq135);
			resultAirMetric.setMq2(resultAirMetric.getMq2() / mq2);
			resultAirMetric.setMq3(resultAirMetric.getMq3() / mq3);
			resultAirMetric.setMq7(resultAirMetric.getMq7() / mq7);
			resultAirMetric.setTemp(resultAirMetric.getTemp() / temp);
			resultAirMetric.setHum(resultAirMetric.getHum() / hum);
		} catch (Exception e) {
			e.printStackTrace();
			resultAirMetric.setName(e.getMessage());
		}

		port.closePort();

		return resultAirMetric;
	}
}
