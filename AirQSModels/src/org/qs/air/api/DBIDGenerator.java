package org.qs.air.api;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.IdentityGenerator;
import org.qs.air.api.base.EntityBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@GenericGenerator(name = "DBIDGenerator", strategy = "identity")
public class DBIDGenerator extends IdentityGenerator {
	private static final Logger log = LoggerFactory.getLogger("models");

	@Override
	public Serializable generate(SessionImplementor session, Object obj) throws HibernateException {
		if (obj == null)
			throw new HibernateException(new NullPointerException());

		if (((EntityBase) obj).getId() == 0L) {
			Serializable id = super.generate(session, obj);
			return id;
		} else {
			return ((EntityBase) obj).getId();

		}
	}
}
