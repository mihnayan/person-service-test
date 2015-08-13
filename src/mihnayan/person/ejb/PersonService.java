package mihnayan.person.ejb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;

import mihnayan.person.model.Person;

/**
 * Session Bean implementation class PersonService
 */
@Singleton
@LocalBean
public class PersonService {

	private static AtomicInteger id = new AtomicInteger(0);
	private static final HashMap<Integer, Person> persons =
			new HashMap<>();
	
    /**
     * Default constructor. 
     */
    public PersonService() {
        // TODO Auto-generated constructor stub
    }

    public static void addPerson(Person person) {
    	persons.put(id.incrementAndGet(), person);
    }
    
    public static Person getPerson(Integer id) {
    	return persons.get(id);
    }
    
    public static List<Person> getPersons() {
    	return new ArrayList<Person>(persons.values());
    }
}
