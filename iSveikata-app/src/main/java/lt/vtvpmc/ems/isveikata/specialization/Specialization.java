package lt.vtvpmc.ems.isveikata.specialization;

import java.io.Serializable;
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
public class Specialization implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String description;

	@OneToMany(mappedBy = "specialization")
	private List<Doctor> doctor;

}
