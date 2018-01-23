package lt.vtvpmc.ems.isveikata.medical_record;


import com.fasterxml.jackson.databind.ObjectMapper;
import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.appointment.JpaAppointmentRepository;
import lt.vtvpmc.ems.isveikata.employees.DTO.RecordAppointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.icd.Icd;
import lt.vtvpmc.ems.isveikata.icd.JpaIcdRepository;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

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

    @Autowired
    private JpaIcdRepository jpaIcdRepository;


	public void createNewRecord(Map<String, Object> map) {
        final ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper

        Icd icd = jpaIcdRepository.findOne(mapper.convertValue(map.get("icdCode"), String.class));
        MedicalRecord medicalRecord = mapper.convertValue(map.get("medicalRecord"), MedicalRecord.class);
        Appointment appointment = mapper.convertValue(map.get("appointment"), Appointment.class);

        medicalRecord.setIcd(icd);
        medicalRecord.setAppointment(appointment);
        medicalRecord.setDoctor((Doctor)jpaEmployeesRepository.findByUserName(mapper.convertValue(map.get("userName"), String.class)));
        medicalRecord.setPatient(jpaPatientRepository.findOne(mapper.convertValue(map.get("patientId"), Long.class)));
        jpaMedicalRecordRepository.save(medicalRecord);
        jpaAppointmentRepository.save(appointment);

	}
}
