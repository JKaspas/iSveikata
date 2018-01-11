package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonSubTypes;

import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonSubTypes({ @JsonSubTypes.Type(value = Admin.class, name = "admin"),
		@JsonSubTypes.Type(value = Doctor.class, name = "doctor"),
		@JsonSubTypes.Type(value = Druggist.class, name = "druggist") })
public abstract class Employee {

	public Employee(String name, String surname, String username, String password) {
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
	}

	public Employee() {
	}

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

}
