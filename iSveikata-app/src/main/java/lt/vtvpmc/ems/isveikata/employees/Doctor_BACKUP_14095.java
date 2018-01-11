package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

<<<<<<< HEAD
import lombok.Data;
=======
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
>>>>>>> Gina
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;

@Entity
@Data
@DiscriminatorValue(value = "Doctor")
public class Doctor extends Employee {

	@ManyToOne
	private Specialization specialization;

	@OneToMany(mappedBy = "doctor")
	private List<Patient> patient;

<<<<<<< HEAD
=======
	@OneToMany(mappedBy = "doctor")
	private List<MedicalRecord> medicalRecords;

	public Doctor() {
	
	}

	public Doctor(Specialization specialization, List<Patient> patient) {
		super();
		this.specialization = specialization;
		this.patient = patient;
	}

	public Specialization getSpecialization() {
		return specialization;
	}

	public void setSpecialization(Specialization specialization) {
		this.specialization = specialization;
	}

	public List<Patient> getPatient() {
		return patient;
	}

	public void setPatient(List<Patient> patient) {
		this.patient = patient;
	}

>>>>>>> Gina
}
