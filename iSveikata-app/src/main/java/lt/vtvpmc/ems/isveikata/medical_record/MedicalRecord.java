package lt.vtvpmc.ems.isveikata.medical_record;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.icd.InternationalClassificationOfDiseases;
import lt.vtvpmc.ems.isveikata.patient.Patient;

@Entity
@Data

public class MedicalRecord {

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private long id;

	 @OneToOne
	 private Appointment appointment;

	 @ManyToOne
	 private Doctor doctor;

	 @ManyToOne
	 private Patient patient;
	 
	 @ManyToOne
	 private InternationalClassificationOfDiseases icd;

	 private boolean isCompensable;
	 
	 private boolean isRepetitive;
	 

	 

}
