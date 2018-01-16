package lt.vtvpmc.ems.isveikata.medical_record;


import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.appointment.JpaAppointmentRepository;
import lt.vtvpmc.ems.isveikata.employees.DTO.RecordAppointment;
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

	public void createNewRecord(RecordAppointment recordAppointment) {
	    MedicalRecord medicalRecord = recordAppointment.getMedicalRecord();
        Appointment appointment = recordAppointment.getAppointment();
        medicalRecord.setAppointment(appointment);
        jpaMedicalRecordRepository.save(medicalRecord);
        jpaAppointmentRepository.save(appointment);

	}
}
