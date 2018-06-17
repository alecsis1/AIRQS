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
@XmlRootElement(name = "AirMetricLocationBase")
@XmlType(name = "AirMetricLocationBase")
@MappedSuperclass
public class AirMetricLocationBase extends EntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	private String name;

	// private String device;

	@Column(name = "timestamp", nullable = false, columnDefinition = "bigint DEFAULT 0 ")
	private long timestamp;

	@Column(name = "lat", columnDefinition = "double DEFAULT 0.00000 ")
	private double lat;

	@Column(name = "lng", columnDefinition = "double DEFAULT 0.00000 ")
	private double lng;

	public AirMetricLocationBase() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
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

	// public String getDevice() {
	// return device;
	// }
	//
	// public void setDevice(String device) {
	// this.device = device;
	// }

	@Override
	public String toString() {
		return "AirMetricLocationBase [name=" + name + ", timestamp=" + timestamp + ", lat=" + lat + ", lng=" + lng
				+ ", getId()=" + getId() + "]";
	}

}
