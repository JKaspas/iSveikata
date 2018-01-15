package lt.vtvpmc.ems.isveikata.patient;


import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.employees.Doctor;
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

	//1 Gauti Pacientu sarasa
	public List<Patient> getPatientList() {
		return jpaPatientRepository.findAll();
	}

	//2 Gauti Pacienta pagal id
	public Patient getPatient(String personalCode) {
		return jpaPatientRepository.findOne(personalCode);
	}

	//3 Gauti Med.irasu sarasa pagal paciento id → return List<Record>"
	public List<MedicalRecord> getPatientRecordList(String personalCode) {
		Patient pat = jpaPatientRepository.findOne(personalCode);
		return pat.getMedicalRecords();
	}
	
	//5“/{patient_id}/record/{record_id}” → return Record with appointmet with doctor
	public  MedicalRecord getPatientRecordById(Long id) {
//		Patient pat =jpaPatientRepository.findOne(personalCode);
		return jpaMedicalRecordRepository.findOne(id);
	}
	
	
	// update/edit patient Password
	public void updatePatientPassword(Patient patient, String personalCode) {
		Patient pat = jpaPatientRepository.findOne(personalCode);
		pat.setPassword(patient.getPassword());
		jpaPatientRepository.save(pat);
	}

	// update/edit patient
	public void editPatient(String personalCode, Patient pat) {
		pat.setPersonalCode(personalCode);
		jpaPatientRepository.save(pat);
	}

	public Patient getPatientListByDoctor(String personalCode, Doctor doctor) {
		// TODO Auto-generated method stub
		return null;
	}
//create new Patient
	public Patient addPatient(Patient patient){
        return jpaPatientRepository.save(patient);
    }
//	public void addPatient(Patient patient) {
//		Patient pat =new Patient();
//		pat.setPersonalCode(pat.getPersonalCode());	
//		pat.setFirstName(pat.getFirstName());
//		pat.setLastName(pat.getLastName());
//		pat.setBirthDate(pat.getBirthDate());
//		pat.setPassword(pat.getPassword());
//		pat.setDoctor(pat.getDoctor());
//		pat.setMedicalRecords(pat.getMedicalRecords());
//		jpaPatientRepository.save(pat);
//		}
		
	}