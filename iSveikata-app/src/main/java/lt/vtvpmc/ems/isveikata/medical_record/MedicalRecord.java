package lt.vtvpmc.ems.isveikata.medical_record;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.icd.InternationalClassificationOfDiseases;

@Entity
@Table (name = "Medical_Record")
public class MedicalRecord {

	 @Id
	 @NotNull
	 @Column (unique = true)	
	 @OneToOne
	 private Appointment appointment;
	 
	 @OneToOne
	 private InternationalClassificationOfDiseases icd;
	 
	 private String duration;
	 
	 private String appointmentDescription;
	 
	 private boolean isCompensable;
	 
	 private boolean isRepetitive;
	 
	 
	 
	 
	 public MedicalRecord(String duration, String appointmentDescription, boolean isCompensable, boolean isRepetitive) {
	      this.duration = duration;
	      this.appointmentDescription = appointmentDescription;
	      this.isCompensable = isCompensable;
	      this.isRepetitive = isRepetitive;     
	   }

	 public MedicalRecord() {	 
	   }
	 
	 
	 
	 

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public InternationalClassificationOfDiseases getIcd() {
		return icd;
	}

	public void setIcd(InternationalClassificationOfDiseases icd) {
		this.icd = icd;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getAppointmentDescription() {
		return appointmentDescription;
	}

	public void setAppointmentDescription(String appointmentDescription) {
		this.appointmentDescription = appointmentDescription;
	}

	public boolean isCompensable() {
		return isCompensable;
	}

	public void setCompensable(boolean isCompensable) {
		this.isCompensable = isCompensable;
	}

	public boolean isRepetitive() {
		return isRepetitive;
	}

	public void setRepetitive(boolean isRepetitive) {
		this.isRepetitive = isRepetitive;
	}
	 	 
}
