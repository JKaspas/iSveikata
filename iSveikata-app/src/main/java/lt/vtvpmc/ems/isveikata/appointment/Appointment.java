package lt.vtvpmc.ems.isveikata.appointment;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import org.hibernate.annotations.Type;

@Entity
@Data
public class Appointment implements Serializable {

	@Id
	@GeneratedValue
	private long id;

	private String description;

	private String duration;
	
	@Type(type = "date")
	private Date date;

	@JsonIgnore
	@OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
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
