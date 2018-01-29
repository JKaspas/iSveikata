package lt.vtvpmc.ems.isveikata.medical_record;

import javax.persistence.*;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.icd.Icd;
import lt.vtvpmc.ems.isveikata.patient.Patient;

import java.io.Serializable;

@Entity
@Data

public class MedicalRecord implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@OneToOne
	private Appointment appointment;

	@ManyToOne
	private Doctor doctor;

	@ManyToOne(fetch = FetchType.LAZY)
	private Patient patient;

	@ManyToOne
	private Icd icd;

	private boolean isCompensable;

	private boolean isRepetitive;

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
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

	public Icd getIcd() {
		return icd;
	}

	public void setIcd(Icd icd) {
		this.icd = icd;
	}
}
