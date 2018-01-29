package lt.vtvpmc.ems.isveikata.specialization;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lt.vtvpmc.ems.isveikata.employees.Doctor;

@Entity
@Data
public class Specialization implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(unique = true, nullable = false)
	private String title;

	@OneToMany(mappedBy = "specialization")
	@JsonIgnore
	private List<Doctor> doctor;

	public List<Doctor> getDoctor() {
		return doctor;
	}

	public void setDoctor(List<Doctor> doctor) {
		this.doctor = doctor;
	}

	public String getTitle() {
		return title;
	}
}
