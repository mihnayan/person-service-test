package mihnayan.person.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import mihnayan.person.ejb.PersonService;
import mihnayan.person.model.Person;

@Path("/")
public class PersonResource {

	@GET
	@Path("/")
	@Produces("application/json")
	public List<Person> getPersons() {
		return PersonService.getPersons();
	}
	
	@GET
	@Path("{id}")
	@Produces("application/json")
	public Person getPerson(@PathParam("id") int id) {
		Person person = PersonService.getPerson(id);
		if (person == null) {
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}
		return person;
	}
	
	@POST
	@Consumes("application/json")
	public void createPerson(Person person) {
		person.setId(PersonService.count.incrementAndGet());
		PersonService.addPerson(person);
	}
}
