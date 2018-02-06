package lt.vtvpmc.ems.isveikata.medical_record;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.icd.Icd;
import lt.vtvpmc.ems.isveikata.patient.Patient;

@Data
public class MedicalRecordDto {
	
	private Long id;
	private Doctor doctor;
	private Long patientId;
	private Appointment appointment;
	private Icd icd;
	private boolean isCompensable;
	private boolean isRepetitive;

	
}
