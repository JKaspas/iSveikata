package lt.vtvpmc.ems.isveikata.appointment;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Entity
public class Appointment implements Serializable {

	@Id
	@GeneratedValue
	private long id;

	private String description;

	private String duration;

	private Date date;

	@OneToOne(mappedBy = "appointment")
	private MedicalRecord medicalRecord;

	public MedicalRecord getMedicalRecord() {
		return medicalRecord;
	}

	public void setMedicalRecord(MedicalRecord medicalRecord) {
		this.medicalRecord = medicalRecord;
	}

	// @Transient
	// private static final DateTimeFormatter DTF =
	// DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

}
