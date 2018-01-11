package lt.vtvpmc.ems.isveikata.appointment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Entity
public class Appointment {

	@Id
	@GeneratedValue
	private long id;

	private String description;

	private String duration;

	private String doctor_name;

	private Date date;

	@OneToOne(mappedBy = "appointment")
	private MedicalRecord medicalRecord;

	// @Transient
	// private static final DateTimeFormatter DTF =
	// DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

}
