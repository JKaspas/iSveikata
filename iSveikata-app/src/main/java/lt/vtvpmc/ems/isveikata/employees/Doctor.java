package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
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

	@JsonIgnore
	@OneToMany(mappedBy = "doctor")
	private List<MedicalRecord> medicalRecords;

	public List<Patient> getPatient() {
		return patient;
	}

	public void setPatient(List<Patient> patient) {
		this.patient = patient;
	}

	public List<MedicalRecord> getMedicalRecords() {
		return medicalRecords;
	}

	public void setMedicalRecords(List<MedicalRecord> medicalRecords) {
		this.medicalRecords = medicalRecords;
	}
}
