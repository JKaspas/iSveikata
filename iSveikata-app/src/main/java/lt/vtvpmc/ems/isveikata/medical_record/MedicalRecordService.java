package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.appointment.JpaAppointmentRepository;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.icd.Icd;
import lt.vtvpmc.ems.isveikata.icd.JpaIcdRepository;
import lt.vtvpmc.ems.isveikata.mappers.MedicalRecordMapper;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;

@Service
@Transactional
public class MedicalRecordService {

	@Autowired
	private JpaMedicalRecordRepository jpaMedicalRecordRepository;

	@Autowired
	private JpaAppointmentRepository jpaAppointmentRepository;

	@Autowired
	private JpaEmployeesRepository<Doctor> jpaEmployeesRepository;

	@Autowired
	private JpaPatientRepository jpaPatientRepository;

	@Autowired
	private JpaIcdRepository jpaIcdRepository;
	@Autowired
	private MedicalRecordMapper mapper;

	public void createNewRecord(Map<String, Object> map) {
		final ObjectMapper mapper = new ObjectMapper(); 

		Icd icd = jpaIcdRepository.findOne(mapper.convertValue(map.get("icdCode"), String.class));
		MedicalRecord medicalRecord = mapper.convertValue(map.get("medicalRecord"), MedicalRecord.class);
		Appointment appointment = mapper.convertValue(map.get("appointment"), Appointment.class);

		medicalRecord.setIcd(icd);
		medicalRecord.setAppointment(appointment);
		medicalRecord.setDoctor(
				(Doctor) jpaEmployeesRepository.findByUserName(mapper.convertValue(map.get("userName"), String.class)));
		medicalRecord.setPatient(jpaPatientRepository.findOne(mapper.convertValue(map.get("patientId"), String.class)));
		jpaMedicalRecordRepository.save(medicalRecord);
		jpaAppointmentRepository.save(appointment);

	}

	public MedicalRecordDto getMedicalRecord(Long medicalRecordId) {
		return mapper.medicalRecordToDto(jpaMedicalRecordRepository.findOne(medicalRecordId));
	}

    public List<Object> getDoctorWorkDaysStatistic(String userName, String dateFrom, String dateTill) {
		Long doctorId = jpaEmployeesRepository.findByUserName(userName).getId();
		return jpaMedicalRecordRepository.getDoctorWorkDaysStatistic(doctorId, dateFrom, dateTill);
    }

	public List<Object> publicTlkStatistics() {
		List newList = new ArrayList<>();
		List <Object[]> list = jpaMedicalRecordRepository.getPublicTlkStatistics(new PageRequest(0, 10));
		Integer total = jpaMedicalRecordRepository.getTotalMedicalRecord();
		for (Object[] obj: list){
			final Map objectMap = new HashMap<String, Object>();
			objectMap.put("info", obj[0]);
			objectMap.put("totalProc", (long)obj[1] * (double)100 / total);
			objectMap.put("totalCount", obj[1]);
			newList.add(objectMap);

		}

		return newList;

	}

}
