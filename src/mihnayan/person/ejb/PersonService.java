package mihnayan.person.ejb;

import java.time.LocalDate;

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

	private static final AtomicInteger count = new AtomicInteger();
	private static final HashMap<Integer, Person> persons =
			new HashMap<>();
	
    /**
     * Default constructor. 
     */
    public PersonService() {
    	
    }
    
    public static int nextId() {
    	return count.incrementAndGet();
    }

    public static void addPerson(Person person) {
    	persons.put(person.getId(), person);
    }
    
    public static Person getPerson(int id) {
    	return persons.get(id);
    }
    
    public static List<Person> getPersons() {
    	return new ArrayList<Person>(persons.values());
    }
}
