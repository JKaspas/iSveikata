	package lt.vtvpmc.ems.isveikata.patient;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Entity
@Data
public class Patient implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;

	@Id
	@Min(10_001_010_000L)
	@Max(89_912_319_999L)
	@Column(unique = true, nullable = false)
	private Long patientId; // personal code

	@Type(type = "date")
	private Date birthDate;

	@NotNull
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	private byte[] password;

	private boolean isActive = true;

	@ManyToOne
	@JsonIgnore
	private Doctor doctor;

	@JsonIgnore
	@OneToMany(mappedBy = "patient")
	private List<MedicalRecord> medicalRecords = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "patient")
	private List<Prescription> prescriptions;

	public void setPassword(String password) {
		this.password = Passwords.hashString(password);
	}

}
