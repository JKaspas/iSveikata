package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;

@Entity
@EqualsAndHashCode(callSuper=true)
@DiscriminatorValue(value = "doctor")
public class Doctor extends Employee {

	@ManyToOne
	private Specialization specialization;
	
	@JsonIgnore
	@OneToMany(mappedBy = "doctor")
	private List<Patient> patient;

	@JsonIgnore
	@OneToMany(mappedBy = "doctor")
	private List<MedicalRecord> medicalRecords;

	@JsonIgnore
	@OneToMany(mappedBy = "doctor")
	private List<Prescription> prescriptions;

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
