package mihnayan.person;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import mihnayan.person.resources.PersonResource;

@ApplicationPath("/")
public class PersonDataApplication extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<>();
		classes.add(PersonResource.class);
		return classes;
	}
	
}
