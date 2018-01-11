package lt.vtvpmc.ems.isveikata.specialization;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.employees.Doctor;

@Entity
@Data
public class Specialization {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long specializationId;
	private String specialization;

	@OneToMany(mappedBy = "specialization")
	private List<Doctor> doctor;

}
