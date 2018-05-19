package org.qs.air.api.base;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.hibernate.annotations.GenericGenerator;

@XmlRootElement(name = "EntityBase")
@XmlType(name = "EntityBase")
@MappedSuperclass
public class EntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "DBIDGenerator")
	@GenericGenerator(name = "DBIDGenerator", strategy = "org.qs.air.api.DBIDGenerator")
	@Column(name = "id", nullable = false, unique = true, columnDefinition = " bigint AUTO_INCREMENT")
	private long id;

	public EntityBase() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "EntityBase [getId()=" + getId() + "]";
	}

}
