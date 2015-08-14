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

	public static AtomicInteger count = new AtomicInteger();
	private static final HashMap<Integer, Person> persons =
			new HashMap<>();
	static {
		persons.put(0, new Person());
		persons.get(0).setId(0);
		persons.get(0).setName("Ivan");
		persons.get(0).setSurname("Sidorov");
		persons.get(0).setPatronymic("Petrovich");
	}
	
    /**
     * Default constructor. 
     */
    public PersonService() {
    	
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
