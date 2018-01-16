package lt.vtvpmc.ems.isveikata.patient;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.medical_record.JpaMedicalRecordRepository;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Service
@Transactional
public class PatientService {

	@Autowired
	private JpaPatientRepository jpaPatientRepository;

	@Autowired
	private JpaMedicalRecordRepository jpaMedicalRecordRepository;

	public JpaPatientRepository getJpaPatientRepository() {
		return jpaPatientRepository;
	}

	public void setJpaPatientRepository(JpaPatientRepository jpaPatientRepository) {
		this.jpaPatientRepository = jpaPatientRepository;
	}

	public JpaMedicalRecordRepository getJpaMedicalRecordRepository() {
		return jpaMedicalRecordRepository;
	}

	public void setJpaMedicalRecordRepository(JpaMedicalRecordRepository jpaMedicalRecordRepository) {
		this.jpaMedicalRecordRepository = jpaMedicalRecordRepository;
	}

	// 1
	public List<Patient> getPatientList() {
		return 	 jpaPatientRepository.findAll()
				.stream()
				.filter(pat -> pat.isActive())
				.collect(Collectors.toList());
	}

	// 2
	public Patient getPatient(Long patientId) {
		return jpaPatientRepository.findOne(patientId);
	}

	// 3
	public List<MedicalRecord> getPatientRecordList(Long patientId) {
		Patient pat = jpaPatientRepository.findOne(patientId);
		return pat.getMedicalRecords();
	}

	// 4
	public MedicalRecord getPatientRecordById(Long id) {
		return jpaMedicalRecordRepository.findOne(id);
	}

	// 6
	public void updatePatientPassword(Patient patient, Long patientId) {
		Patient pat = jpaPatientRepository.findOne(patientId);
		pat.setPassword(patient.getPassword());
		jpaPatientRepository.save(pat);
	}

	public void addNewPatient(Patient patient) {
		jpaPatientRepository.save(patient);
	}

}
