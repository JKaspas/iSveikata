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
import lt.vtvpmc.ems.isveikata.Passwords;

@Entity
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(include = As.PROPERTY, property = "type", use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME)
@JsonSubTypes({ @JsonSubTypes.Type(value = Admin.class, name = "admin"),
		@JsonSubTypes.Type(value = Doctor.class, name = "doctor"),
		@JsonSubTypes.Type(value = Druggist.class, name = "druggist") })
public abstract class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(unique = true, nullable = false)
	private String userName;

	@NotNull
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	private byte[] password;

	private boolean isAcitve = true;

	public Employee() {
	}

	public Employee(String firstName, String lastName, String userName, byte[] password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
	}

	public boolean isAcitve() {
		return isAcitve;
	}

	public void setAcitve(boolean acitve) {
		isAcitve = acitve;
	}
	
	public void setPassword(String password) {
		this.password = Passwords.hashString(password);
	}
	
	public byte[] getPassword() {
		return password;
	}

	public String getUserName() {
		return userName;
	}
	
}
