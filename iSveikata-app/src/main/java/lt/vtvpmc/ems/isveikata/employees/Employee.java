package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(include = As.PROPERTY, property = "type", use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME)
@JsonSubTypes({ 
		@JsonSubTypes.Type(value = Admin.class, name = "admin"),
		@JsonSubTypes.Type(value = Doctor.class, name = "doctor"),
		@JsonSubTypes.Type(value = Druggist.class, name = "druggist") })
public abstract class Employee  {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String name;
	@NotNull
	private String surname;
	@Column(unique = true, nullable = false)
	private String username;
	@NotNull
	private String password;
	
	public Employee() {
	}
	
	public Employee(String name, String surname, String username, String password) {
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
	}

}
