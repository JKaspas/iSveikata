package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;




@Entity
@DiscriminatorValue(value = "Doctor")
public class Doctor extends Employee {

	private Specialization specialization;
	private List <Patient> patient;
	
	
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
	
	
	
	
    

    
	
}
