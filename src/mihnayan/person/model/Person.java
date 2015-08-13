package mihnayan.person.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="person")
public class Person {

	@XmlElement
	private String surname;
	@XmlElement
	private String name;
	@XmlElement
	private String patronymic;
	@XmlElement
	private Date bornDate;
	
	public Person(String surname, String name, String patronymic) {
		this.surname = surname;
		this.name = name;
		this.patronymic = patronymic;
	}
	
	public Person() {
		
	}
}
