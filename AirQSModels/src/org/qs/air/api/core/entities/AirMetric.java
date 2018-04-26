package org.qs.air.api.core.entities;

import java.io.Serializable;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.qs.air.api.base.AirMetricBase;
import org.qs.air.api.core.models.AirMetric0;

/**
 * The persistent class for the AirMetrics database table.
 * 
 */
@XmlRootElement(name = "AirMetric")
@XmlType(name = "AirMetric")
@Entity
@Table(name = "AirMetrics")
@NamedQueries(value = { @NamedQuery(name = "AirMetric.findAll", query = "SELECT b FROM AirMetric b"),
		@NamedQuery(name = "AirMetric.findAllByNameNew", query = "SELECT b FROM AirMetric b where b.name= :name") })
@SqlResultSetMappings(value = { @SqlResultSetMapping(name = "AirMetric0", classes = {
		@ConstructorResult(targetClass = AirMetric0.class, columns = { @ColumnResult(name = "id", type = Long.class),
				@ColumnResult(name = "name", type = String.class),
				@ColumnResult(name = "air_metric_type", type = Integer.class) }) }) })
public class AirMetric extends AirMetricBase implements Serializable {
	private static final long serialVersionUID = 1L;

	public AirMetric() {
	}

}