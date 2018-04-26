package org.qs.air.api.core.models;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.qs.air.api.base.EntityBase;

@XmlRootElement(name = "NamedEntityBase")
@XmlType(name = "NamedEntityBase")
public class NamedEntityBase extends EntityBase implements Serializable
{
	private static final long serialVersionUID = 1L;

	private String name;

	public NamedEntityBase()
	{
	}

	public NamedEntityBase(String name)
	{
		this.name = name;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}
}
