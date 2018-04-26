package org.qs.air.api.core.models;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "AirMetric0")
@XmlType(name = "AirMetric0")
public class AirMetric0 extends NamedEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	private int airMetricType;

	public AirMetric0() {
	}

	public AirMetric0(long id, String name, int airMetricType) {
		this.setId(id);
		this.setName(name);
		this.airMetricType = airMetricType;
	}

	public int getAirMetricType() {
		return airMetricType;
	}

	public void setAirMetricType(int airMetricType) {
		this.airMetricType = airMetricType;
	}

}
