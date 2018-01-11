package lt.vtvpmc.ems.isveikata.patient;

import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import lombok.Data;
import lt.vtvpmc.ems.isveikata.employees.Doctor;

@Entity
@Data
public class Patient {

	@Id
	@Length(min = 11, max = 11)
	@Column(unique = true, nullable = false)
	private String personalCode;
	private Date birthDate;
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	@NotNull
	private String password;

	@ManyToOne
	private Doctor doctor;

}
