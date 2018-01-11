package lt.vtvpmc.ems.isveikata.specialization;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lt.vtvpmc.ems.isveikata.employees.Doctor;

@Entity
public class Specialization {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long specializationId;
	private String specialization;
	 @OneToMany(mappedBy = "specialization")
	 private List <Doctor> doctor;
	
	 public Specialization() {
		}
	

	public Specialization(Long specializationId, String specialization, List<Doctor> doctor) {
		super();
		this.specializationId = specializationId;
		this.specialization = specialization;
		this.doctor = doctor;
	}

	public List<Doctor> getDoctor() {
		return doctor;
	}

	public void setDoctor(List<Doctor> doctor) {
		this.doctor = doctor;
	}

	public Long getSpecializationId() {
		return specializationId;
	}

	public void setSpecializationId(Long specializationId) {
		this.specializationId = specializationId;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

}
