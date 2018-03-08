package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;
import javax.validation.constraints.Null;

import lt.vtvpmc.ems.isveikata.IsveikataApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
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

	@PreAuthorize("hasRole('Doctor')")
	public void createNewRecord(Map<String, Object> map) {
		final ObjectMapper mapper = new ObjectMapper();
		Icd icd = jpaIcdRepository.findOne(mapper.convertValue(map.get("icdCode"), String.class));
		MedicalRecord medicalRecord = mapper.convertValue(map.get("medicalRecord"), MedicalRecord.class);
		Appointment appointment = mapper.convertValue(map.get("appointment"), Appointment.class);
		if (!medicalRecord.isRepetitive())
			icd.setCounter(icd.getCounter() + 1);
		medicalRecord.setIcd(icd);
		medicalRecord.setAppointment(appointment);
		medicalRecord.setDoctor(
				(Doctor) jpaEmployeesRepository.findByUserName(mapper.convertValue(map.get("userName"), String.class)));
		medicalRecord.setPatient(jpaPatientRepository.findOne(mapper.convertValue(map.get("patientId"), String.class)));
		jpaMedicalRecordRepository.save(medicalRecord);
		jpaIcdRepository.save(icd);
		jpaAppointmentRepository.save(appointment);
	}

	@PreAuthorize("hasRole('Doctor') OR hasRole('Patient')")
	public MedicalRecordDto getMedicalRecord(Long medicalRecordId) {
		return mapper.medicalRecordToDto(jpaMedicalRecordRepository.findOne(medicalRecordId));
	}

	@PreAuthorize("hasRole('Doctor')")
	public List<Object> getDoctorWorkDaysStatistic(String userName, String dateFrom, String dateTill) {
		Long doctorId = jpaEmployeesRepository.findByUserName(userName).getId();
		return jpaMedicalRecordRepository.getDoctorWorkDaysStatistic(doctorId, dateFrom, dateTill);
	}

	public List<Map<String, Object>> publicTlkStatistics() {
		List<Map<String, Object>> newList = new ArrayList<Map<String, Object>>();
		List<Icd> list = jpaIcdRepository.findAllByOrderByCounterDesc(new PageRequest(0, 10));
		Integer total = jpaMedicalRecordRepository.getTotalNonRepetitiveMedicalRecordCount();

		for (Icd icd : list) {
			final Map<String, Object> objectMap = new HashMap<String, Object>();
			try {
				objectMap.put("info", icd.getTitle());
				objectMap.put("totalProc", (long) icd.getCounter() * (double) 100 / total);
				objectMap.put("totalCount", icd.getCounter());
				newList.add(objectMap);
			}catch (NullPointerException ex){
				IsveikataApplication.LOGGER.warning("Gotten values where null..." + ex);
			}
		}
		return newList;
	}

}
