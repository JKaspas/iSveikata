package lt.vtvpmc.ems.isveikata.patient;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Entity
@Data
public class Patient implements Serializable {

	@Id
    @Min(10_001_010_000L)
	@Max(89_912_319_999L)
	@Column(unique = true, nullable = false)
	private Long patientId; // personal code

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
	
	

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public List<MedicalRecord> getMedicalRecords() {
		return this.medicalRecords;
	}

	public void setMedicalRecords(List<MedicalRecord> medicalRecords) {
		this.medicalRecords = medicalRecords;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = Passwords.hashString(password);
	}



}
