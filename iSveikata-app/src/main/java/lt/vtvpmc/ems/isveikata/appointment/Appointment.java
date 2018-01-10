package lt.vtvpmc.ems.isveikata.appointment;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.patient.Patient;

@Entity
@Table
public class Appointment {
	
	 @Id 
	 @GeneratedValue (strategy = GenerationType.AUTO)
	 private long id;
	
	 @ManyToOne
	 private Doctor doctor;
	 
	 @ManyToOne
	 private Patient patient;
	 
	 private String currentDate;
	 
	 @Transient
	 private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	 
	 
	 
	 
	 public Appointment(long id) {
	      this.id = id;
	   }

	 public Appointment() {	 
	   }

	 
	 
	 
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getCurrentDate() {
		LocalDateTime now = LocalDateTime.now();
		return DTF.format(now);
	}
	 
	 
	 

}
