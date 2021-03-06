package mihnayan.person.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="person")
public class Person {

	@XmlElement
	private int id;
	@XmlElement
	private String surname;
	@XmlElement
	private String name;
	@XmlElement
	private String patronymic;
	@XmlElement
	private long bornDate;
	
	public Person() {
		
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPatronymic() {
		return patronymic;
	}

	public void setPatronymic(String patronymic) {
		this.patronymic = patronymic;
	}

	public long getBornDate() {
		return bornDate;
	}

	public void setBornDate(long bornDate) {
		this.bornDate = bornDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
