package lt.vtvpmc.ems.isveikata.medical_record;


import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.appointment.JpaAppointmentRepository;
import lt.vtvpmc.ems.isveikata.employees.DTO.RecordAppointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MedicalRecordService {

    @Autowired
    private JpaMedicalRecordRepository jpaMedicalRecordRepository;

    @Autowired
    private JpaAppointmentRepository jpaAppointmentRepository;

    @Autowired
    private JpaEmployeesRepository jpaEmployeesRepository;

    @Autowired
    private JpaPatientRepository jpaPatientRepository;

	public void createNewRecord(RecordAppointment recordAppointment) {
	    MedicalRecord medicalRecord = recordAppointment.getMedicalRecord();
        Appointment appointment = recordAppointment.getAppointment();
        medicalRecord.setAppointment(appointment);
        medicalRecord.setDoctor((Doctor)jpaEmployeesRepository.findByUserName(recordAppointment.getUserName()));
        medicalRecord.setPatient(jpaPatientRepository.findOne(recordAppointment.getPatientId()));
        jpaMedicalRecordRepository.save(medicalRecord);
        jpaAppointmentRepository.save(appointment);

	}
}
