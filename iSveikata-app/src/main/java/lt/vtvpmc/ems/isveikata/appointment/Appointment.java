package lt.vtvpmc.ems.isveikata.appointment;


import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.patient.Patient;

import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

@Entity
public class Appointment{
	
	@Id
	@GeneratedValue
	private long id;

	private String description;

	private String duration;

	private String doctor_name;

	private Date date;

	@OneToOne(mappedBy = "appointment")
	private MedicalRecord medicalRecord;






//	 @Transient
//	 private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");




	 
	 

}
