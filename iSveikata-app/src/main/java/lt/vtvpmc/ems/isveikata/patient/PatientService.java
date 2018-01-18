package lt.vtvpmc.ems.isveikata.patient;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.medical_record.JpaMedicalRecordRepository;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@Service
@Transactional
public class PatientService {

	@Autowired
	private JpaPatientRepository jpaPatientRepository;

	@Autowired
	private JpaMedicalRecordRepository jpaMedicalRecordRepository;

	// 1
	public List<Patient> getPatientList() {
		return jpaPatientRepository.findAll().stream().filter(pat -> pat.isActive()).collect(Collectors.toList());
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
	public void updatePatientPassword(final String password, Long patientId) throws NoSuchAlgorithmException {
		Patient pat = jpaPatientRepository.findOne(patientId);
		pat.setPassword(password);
		jpaPatientRepository.save(pat);
	}

	// 7
	public void addNewPatient(Patient patient) {
		jpaPatientRepository.save(patient);
	}

	// 8
	public List<Patient> getPatientListWithoutDoctor() {
		return getPatientList().stream().filter(pat -> pat.getDoctor() == null).collect(Collectors.toList());
	}

	// 9
	public boolean patientLogin(String patientId, String password) {
		byte[] dbPassword = jpaPatientRepository.findOne(Long.parseLong(patientId)).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
	}

	// 10 new
	public boolean validateAddNewPatient(Patient patient) {
		if (jpaPatientRepository.exists(patient.getPatientId())) {
			return false;
		} else {
			return true;
		}
	}

}
