package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.transaction.Transactional;

import lt.vtvpmc.ems.isveikata.prescription.JpaPrescriptionRepository;
import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.medical_record.JpaMedicalRecordRepository;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

/**
 * The Class PatientService.
 */
@Service
@Transactional
public class PatientService {

	/** The patient repository. */
	@Autowired
	private JpaPatientRepository patientRepository;

	/** The medical record repository. */
	@Autowired
	private JpaMedicalRecordRepository medicalRecordRepository;

	/** The medical record repository. */
	@Autowired
	private JpaPrescriptionRepository prescriptionRepository;


	/**
	 * Get all patient (paged list)
	 * @param pageable
	 * @return
	 */
	public Page<Patient> getAllPagedActivePatient(Pageable pageable){
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		return patientRepository.findByIsActiveTrue(request);
	}

	/**
	 * Get all patient by doctor userName (paged list)
	 *
	 * @param pageable
	 * @param userName
	 * @return Page<List> of patient
	 */
	public Page<Patient> getAllPagedPatientByDoctor(Pageable pageable, String userName){
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		return patientRepository.findAllByDoctorUserName(userName, request);
	}

	/**
	 * Gets the patient list.
	 *
	 * @return the patient list
	 */
	public List<Patient> getActivePatientList() {
		return patientRepository.findByIsActiveTrue();
	}
	/**
	 * Gets the patient.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient
	 */
	public Patient getPatient(Long patientId) {
		return patientRepository.findOne(patientId);
	}

	/**
	 * Gets the patient record list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient record list
	 */
	public Page<MedicalRecord> getPatientRecordList(Long patientId, Pageable pageable) {
		PageRequest request =  new PageRequest(pageable.getPageNumber()-1, pageable.getPageSize());
		return medicalRecordRepository.findAllByPatientPatientId(patientId,request);
	}

	/**
	 * Gets the patient prescription list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient prescription list
	 */
	public Page<Prescription> getPatientPrescriptionList(Long patientId, Pageable pageable) {
		PageRequest request =  new PageRequest(pageable.getPageNumber()-1, pageable.getPageSize());
		return prescriptionRepository.findAllByPatientPatientId(patientId,request);
	}

	/**
	 * Gets the patient record by id.
	 *
	 * @param id
	 *            the id
	 * @return the patient record by id
	 */
	public MedicalRecord getPatientRecordById(Long id) {
		return medicalRecordRepository.findOne(id);
	}

	/**
	 * Update patient password.
	 *
	 *
     * @param oldPassword
     * @param newPassword
     *            the password
     * @param patientId
     *            the patient id
     * @throws NoSuchAlgorithmException
	 *             the no such algorithm exception
	 */
	public boolean updatePatientPassword(String oldPassword, final String newPassword, Long patientId) throws NoSuchAlgorithmException {
		Patient pat = patientRepository.findOne(patientId);
		if(Passwords.isValid(pat.getPassword(), Passwords.hashString(oldPassword))){
			pat.setPassword(newPassword);
			patientRepository.save(pat);
			return true;
		}else{
			return false;
		}

	}

	/**
	 * Adds the new patient.
	 *
	 * @param patient
	 *            the patient
	 */
	// 7
	public void addNewPatient(Patient patient) {
		patientRepository.save(patient);
	}

	/**
	 * Gets the patient list without doctor.
	 *
	 * @return the patient list without doctor
	 */
	// 8
	public Page<Patient> getPatientListWithoutDoctor(Pageable pageable) {
		return patientRepository.findByIsActiveTrueAndDoctorIsNull(new PageRequest(pageable.getPageNumber()-1, pageable.getPageSize()));
	}
	/**
	 * Patient login.
	 *
	 * @param patientId
	 *            the patient id
	 * @param password
	 *            the password
	 * @return true, if successful
	 */
	// 9
	public boolean patientLogin(String patientId, String password) {
		byte[] dbPassword = patientRepository.findOne(Long.parseLong(patientId)).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
	}

	/**
	 * Validate add new patient.
	 *
	 * @param patient
	 *            the patient
	 * @return true, if successful
	 */
	// 10 new
	public boolean validateAddNewPatient(Patient patient) {
		if (patientRepository.exists(patient.getPatientId())) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Deactivate patient.
	 *
	 * @param patient_id
	 *            the patient id
	 */
	public void deactivatePatient(Long patient_id) {
		Patient patient = patientRepository.findOne(patient_id);
		patient.setActive(false);
		patientRepository.save(patient);
	}

	/**
	 * Return patient status: active or not.
	 *
	 * @param patientId
	 *            the patient id
	 */
	public boolean isPatientActive(String patientId) {
		if(patientId.matches("\\d+")) {
			Patient patient = patientRepository.findOne(Long.parseLong(patientId));
			return patient != null ? patient.isActive() : false;
		}else{
			return false;
		}
	}

}
