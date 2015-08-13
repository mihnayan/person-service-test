package mihnayan.person.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import mihnayan.person.model.Person;

@Path("/")
public class PersonResource {

	@GET
	@Path("/person")
	@Produces("text/plain, application/json")
	public Person getPerson(@QueryParam("id") Integer id) {
		return new Person();
	}
}
