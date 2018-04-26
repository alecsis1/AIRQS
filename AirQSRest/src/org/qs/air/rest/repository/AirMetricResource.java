package org.qs.air.rest.repository;

import java.security.Principal;
import java.text.ParseException;
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
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.qs.air.api.core.entities.AirMetric;
import org.qs.air.rest.GenericResponse;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;

@Path("/am")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({ "administrators", "users" })
public class AirMetricResource {

	@PersistenceUnit(unitName = "AirQSPersistence")
	EntityManagerFactory emf;

	@Resource
	UserTransaction tx;

	@Context
	private SecurityContext securityContext;

	@POST
	@Path("/")
	public Response addAirMetric(AirMetric am) {
		GenericResponse response = new GenericResponse();

		if (am.getId() != 0L) {
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

		em.persist(am);
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
		response.setMessage("AirMetric created successfully");

		return Response.ok(response).entity(am).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteAirMetric(@PathParam("id") long id) {
		GenericResponse response = new GenericResponse();
		if (id == 0L) {
			response.setStatus(false);
			response.setMessage("AirMetric is must be different than 0");
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

		AirMetric am = em.find(AirMetric.class, id);

		if (am != null) {
			em.remove(am);

			response.setStatus(true);
			response.setMessage("AirMetric deleted successfully");
		} else {
			response.setStatus(false);
			response.setMessage("AirMetric not found! id: " + id);
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
	public AirMetric getAirMetric(@PathParam("id") long id) {
		EntityManager em = emf.createEntityManager();

		AirMetric am = em.find(AirMetric.class, id);

		em.close();

		return am;
	}

	@GET
	@Path("/dummy")
	public AirMetric getDummy() {
		AirMetric am = new AirMetric();
		am.setName("Dummy am");
		am.setId(0L);

		return am;
	}

	@GET
	@Path("/all")
	public AirMetric[] getAllAirMetrics() {

		EntityManager em = emf.createEntityManager();

		List<AirMetric> ams = em.createNamedQuery("AirMetric.findAll", AirMetric.class).getResultList();

		AirMetric[] amsReturn = ams.toArray(new AirMetric[ams.size()]);

		em.close();

		return amsReturn;
	}
}
