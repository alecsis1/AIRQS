package org.qs.air.api.core.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.qs.air.api.base.AirMetricLocationBase;

/**
 * The persistent class for the AirMetricLocation database table.
 * 
 */
@XmlRootElement(name = "AirMetricLocation")
@XmlType(name = "AirMetricLocation")
@Entity
@Table(name = "AirMetricLocations")
@NamedQueries(value = {
		@NamedQuery(name = "AirMetricLocation.findAll", query = "SELECT b FROM AirMetricLocation b order by b.timestamp DESC"),
		@NamedQuery(name = "AirMetric.findAllByDevice", query = "SELECT b FROM AirMetricLocation b where b.device= :device order by b.timestamp DESC") })
public class AirMetricLocation extends AirMetricLocationBase implements Serializable {
	private static final long serialVersionUID = 1L;

	public AirMetricLocation() {
	}

}