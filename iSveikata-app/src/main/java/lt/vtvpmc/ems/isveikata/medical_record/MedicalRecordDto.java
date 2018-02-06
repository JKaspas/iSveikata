package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.Date;

import lombok.Data;

@Data
public class MedicalRecordDto {

	// private Long id;
	// private Doctor doctor;
	// private Long patientId;
	// private Appointment appointment;
	// private Icd icd;

	private String doctorFullName;
	private String icdCode;
	private String icdDescription;
	private Date appointmentDate;
	private Integer appoitmentDuration;
	private String appointmentDescription;
	private boolean isCompensable;
	private boolean isRepetitive;

	// appointmentDate, doctorFullName, icdCode, icdTitle, appointmentDuration,
	// description, compensable, isRepetitive
}
