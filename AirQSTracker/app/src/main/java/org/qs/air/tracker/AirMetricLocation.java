package org.qs.air.tracker;

import java.io.Serializable;


public class AirMetricLocation implements Serializable {
	private static final long serialVersionUID = 1L;

	private long id;

	private String name;

	// private String device;

	private long timestamp;

	private double lat;

	private double lng;

	public AirMetricLocation() {
	}

    public AirMetricLocation(String name, long timestamp, double lat, double lng) {
        this.id = id;
        this.name = name;
        this.timestamp = timestamp;
        this.lat = lat;
        this.lng = lng;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
				+ ", id=" + id + "]";
	}

}
