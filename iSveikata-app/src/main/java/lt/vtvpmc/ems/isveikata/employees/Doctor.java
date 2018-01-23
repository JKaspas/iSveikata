package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;

@Entity
@Data
@DiscriminatorValue(value = "doctor")
public class Doctor extends Employee {

	@ManyToOne(fetch = FetchType.LAZY)
	private Specialization specialization;
	
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
	private List<Patient> patient;

	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
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

	public Specialization getSpecialization() {
		return specialization;
	}

	public void setSpecialization(Specialization specialization) {
		this.specialization = specialization;
	}
}
