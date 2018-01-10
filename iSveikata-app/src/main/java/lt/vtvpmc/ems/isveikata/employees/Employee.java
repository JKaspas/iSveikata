package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonSubTypes;


@Entity
@Inheritance (strategy = InheritanceType.SINGLE_TABLE)
@JsonSubTypes({ @JsonSubTypes.Type(value = Admin.class, name = "admin"),
				@JsonSubTypes.Type(value = Doctor.class, name = "doctor"),
				@JsonSubTypes.Type(value = Druggist.class, name = "druggist") })
public abstract class Employee {
	
	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String name;
	@NotNull
	private String surname;
	@NotNull
	private String  password;
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	

}
