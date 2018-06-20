package org.qs.air.api.base;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * The persistent class for the folders database table.
 * 
 */
@XmlRootElement(name = "AirMetricBase")
@XmlType(name = "AirMetricBase")
@MappedSuperclass
public class AirMetricBase extends EntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	private String name;

	@Column(name = "mq7", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double mq7;

	@Column(name = "mq3", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double mq3;

	@Column(name = "mq135", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double mq135;

	@Column(name = "mq2", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double mq2;

	@Column(name = "hum", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double hum;

	@Column(name = "temp", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double temp;

	@Column(name = "pressure", nullable = false, columnDefinition = "double DEFAULT 0.0000 ")
	private double pressure;

	@Column(name = "timestamp", nullable = false, columnDefinition = "bigint DEFAULT 0 ")
	private long timestamp;

	@Column(name = "lat", nullable = false, columnDefinition = "double DEFAULT 0.00000 ")
	private double lat;

	@Column(name = "lng", nullable = false, columnDefinition = "double DEFAULT 0.00000 ")
	private double lng;

	public AirMetricBase() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMq7() {
		return mq7;
	}

	public void setMq7(double mq7) {
		this.mq7 = mq7;
	}

	public double getMq3() {
		return mq3;
	}

	public void setMq3(double mq3) {
		this.mq3 = mq3;
	}

	public double getMq135() {
		return mq135;
	}

	public void setMq135(double mq135) {
		this.mq135 = mq135;
	}

	public double getMq2() {
		return mq2;
	}

	public void setMq2(double mq2) {
		this.mq2 = mq2;
	}

	public double getHum() {
		return hum;
	}

	public void setHum(double hum) {
		this.hum = hum;
	}

	public double getTemp() {
		return temp;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public double getPressure() {
		return pressure;
	}

	public void setPressure(double pressure) {
		this.pressure = pressure;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	@Override
	public String toString() {
		return "AirMetricBase [name=" + name + ", mq7=" + mq7 + ", mq3=" + mq3 + ", mq135=" + mq135 + ", mq2=" + mq2
				+ ", hum=" + hum + ", temp=" + temp + ", pressure=" + pressure + ", timestamp=" + timestamp + ", lat="
				+ lat + ", lng=" + lng + ", getId()=" + getId() + "]";
	}

}
