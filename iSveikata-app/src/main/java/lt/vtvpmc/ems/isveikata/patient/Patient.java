	package lt.vtvpmc.ems.isveikata.patient;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.prescription.Prescription;

@Entity
@Table(indexes = {
		@Index(name = "idx_firstName", columnList = "firstName"),
		@Index(name = "idx_lastName", columnList = "lastName"),
		@Index(name = "idx_first_lastName", columnList = "firstName,lastName")
		})
@Data
public class Patient implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;

	@Id
//	@Min(10_001_010_000L)
//	@Max(89_912_319_999L)
	@Column(unique = true, nullable = false)
	private String patientId; // personal code

	@Type(type = "date")
	private Date birthDate;

	@NotNull
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	private String password;

	private boolean isActive = true;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Doctor doctor;

	@JsonIgnore
	@OneToMany(mappedBy = "patient")
	private List<MedicalRecord> medicalRecords = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "patient")
	private List<Prescription> prescriptions;

}
