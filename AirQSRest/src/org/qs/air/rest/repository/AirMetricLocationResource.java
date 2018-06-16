package org.qs.air.rest.repository;

import java.util.List;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.qs.air.api.core.entities.AirMetricLocation;
import org.qs.air.rest.GenericResponse;

@Path("/aml")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({ "administrators", "users" })
public class AirMetricLocationResource {

	@PersistenceUnit(unitName = "AirQSPersistence")
	EntityManagerFactory emf;

	@Resource
	UserTransaction tx;

	@Context
	private SecurityContext securityContext;

	@POST
	@Path("/")
	public Response addAirMetricLocation(AirMetricLocation aml) {
		GenericResponse response = new GenericResponse();

		if (aml.getId() != 0L) {
			response.setStatus(false);
			response.setMessage("AirMetric id must be 0 to create a new one!");
			response.setErrorCode("EC-01");
			return Response.status(422).entity(response).build();
		}

		try {
			tx.begin();
		} catch (NotSupportedException | SystemException e) {
			// log.error(e.getMessage(), e);
			e.printStackTrace();
		}

		EntityManager em = emf.createEntityManager();

		em.persist(aml);
		em.flush();

		em.close();

		try {
			tx.commit();
		} catch (SecurityException | IllegalStateException | RollbackException | HeuristicMixedException
				| HeuristicRollbackException | SystemException e) {
			// log.error(e.getMessage(), e);
			e.printStackTrace();
		}

		response.setStatus(true);
		response.setMessage("AirMetricLocation created successfully");

		return Response.ok(response).entity(aml).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteAirMetricLocation(@PathParam("id") long id) {
		GenericResponse response = new GenericResponse();
		if (id == 0L) {
			response.setStatus(false);
			response.setMessage("AirMetricLocation is must be different than 0");
			response.setErrorCode("EC-02");
			return Response.status(404).entity(response).build();
		}

		try {
			tx.begin();
		} catch (NotSupportedException | SystemException e) {
			// log.error(e.getMessage(), e);
			e.printStackTrace();
		}

		EntityManager em = emf.createEntityManager();

		AirMetricLocation aml = em.find(AirMetricLocation.class, id);

		if (aml != null) {
			em.remove(aml);

			response.setStatus(true);
			response.setMessage("AirMetricLocation deleted successfully");
		} else {
			response.setStatus(false);
			response.setMessage("AirMetricLocation not found! id: " + id);
			response.setErrorCode("EC-02");

		}

		em.close();

		try {
			tx.commit();
		} catch (SecurityException | IllegalStateException | RollbackException | HeuristicMixedException
				| HeuristicRollbackException | SystemException e) {
			// log.error(e.getMessage(), e);
			e.printStackTrace();
		}

		if (response.isStatus()) {
			return Response.ok(response).build();
		} else {
			return Response.status(404).entity(response).build();
		}
	}

	@GET
	@Path("/{id}")
	public AirMetricLocation getAirMetricLocation(@PathParam("id") long id) {
		EntityManager em = emf.createEntityManager();

		AirMetricLocation aml = em.find(AirMetricLocation.class, id);

		em.close();

		return aml;
	}

	@GET
	@Path("/dummy")
	public AirMetricLocation getDummy() {
		AirMetricLocation aml = new AirMetricLocation();
		aml.setName("Dummy aml");
		aml.setId(0L);
		aml.setDevice("pi-dummy");
		aml.setTimestamp(System.currentTimeMillis());
		aml.setLat(25.43434D);
		aml.setLng(45.54365436);

		return aml;
	}

	@GET
	@Path("/all")
	public AirMetricLocation[] getAllAirMetricLocations() {

		EntityManager em = emf.createEntityManager();

		List<AirMetricLocation> amls = em.createNamedQuery("AirMetricLocation.findAll", AirMetricLocation.class)
				.getResultList();

		AirMetricLocation[] amlsReturn = amls.toArray(new AirMetricLocation[amls.size()]);

		em.close();

		return amlsReturn;
	}

	@GET
	@Path("/all/{device}")
	public AirMetricLocation[] getAllAirMetricLocations(@PathParam("device") String device) {

		EntityManager em = emf.createEntityManager();

		List<AirMetricLocation> amls = em.createNamedQuery("AirMetricLocation.findAllByDevice", AirMetricLocation.class)
				.setParameter("device", device).getResultList();

		AirMetricLocation[] amlsReturn = amls.toArray(new AirMetricLocation[amls.size()]);

		em.close();

		return amlsReturn;
	}
}
