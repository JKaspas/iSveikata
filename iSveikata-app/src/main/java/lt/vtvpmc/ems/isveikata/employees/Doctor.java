package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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

	@OneToMany(mappedBy = "doctor")
	private List<MedicalRecord> medicalRecords;

}
