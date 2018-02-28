package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.vtvpmc.ems.isveikata.SHA256Encrypt;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.mappers.MedicalRecordMapper;
import lt.vtvpmc.ems.isveikata.mappers.PatientMapper;
import lt.vtvpmc.ems.isveikata.mappers.PrescriptionMapper;
import lt.vtvpmc.ems.isveikata.medical_record.JpaMedicalRecordRepository;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordDto;
import lt.vtvpmc.ems.isveikata.prescription.JpaPrescriptionRepository;
import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import lt.vtvpmc.ems.isveikata.prescription.PrescriptionDto;

/**
 * The Class PatientService.
 */
@Service
@Transactional
public class PatientService {

	/** The patient repository. */
	@Autowired
	private JpaPatientRepository patientRepository;

	/** The patient repository. */
	@Autowired
	private JpaEmployeesRepository<Doctor> doctorRepository;

	/** The medical record repository. */
	@Autowired
	private JpaMedicalRecordRepository medicalRecordRepository;

	@Autowired
	private PatientMapper patientMapper;

	@Autowired
	private MedicalRecordMapper medicalRecordMapper;

	@Autowired
	private PrescriptionMapper prescriptionMapper;

	/** The medical record repository. */
	@Autowired
	private JpaPrescriptionRepository prescriptionRepository;

	/**
	 * Get all patient (paged list)
	 * 
	 * @param pageable
	 * @return
	 */
	public Page<PatientDto> getAllPagedActivePatient(Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		Page<Patient> patientPage = patientRepository.findByActive(request);
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage.getContent());
		return new PageImpl<>(dtos, request, patientPage.getTotalElements());
	}

	/**
	 * Get all patient (paged list)
	 * 
	 * @param pageable
	 * @return
	 */
	public Page<Patient> getAllPatientByPatientId(String patientId, Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		return patientRepository.findAllPatientByPatientId(patientId, request);
	}

	/**
	 * Get all patient by doctor userName (paged list)
	 *
	 * @param pageable
	 * @param userName
	 * @return Page<List> of patient
	 */
	public Page<PatientDto> getAllPagedPatientByDoctor(Pageable pageable, String userName) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		List<Patient> patientPage = patientRepository.findPatientByDoctorUserName(doctorRepository.findByUserName(userName).getId());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		Integer end = (request.getOffset()+request.getPageSize() > dtos.size() ? dtos.size():request.getOffset()+request.getPageSize());
		return new PageImpl<>(dtos.subList(request.getOffset(),  end), request, dtos.size());
	}

	/**
	 * Gets the patient list.
	 *
	 * @return the patient list
	 */
	public List<PatientDto> getActivePatientList() {
		return patientMapper.patiensToDto(patientRepository.findByIsActiveTrue());
	}

	/**
	 * Gets the patient.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient
	 */
	public PatientDto getPatient(String patientId) {
		return patientMapper.patientToDto(patientRepository.findOne(patientId));
	}

	/**
	 * Gets the patient record list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient record list
	 */
	public Page<MedicalRecordDto> getPatientRecordList(String patientId, Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC,
				"id");
		Page<MedicalRecord> medicalRecordPage = medicalRecordRepository.findAllByPatientPatientId(patientId, request);
		List<MedicalRecordDto> dtos = medicalRecordMapper.medicalRecordsToDto(medicalRecordPage.getContent());
		return new PageImpl<>(dtos, request, medicalRecordPage.getTotalElements());
	}

	/**
	 * Gets the patient prescription list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient prescription list
	 */
	public Page<PrescriptionDto> getPatientPrescriptionList(String patientId, Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC,
				"expirationDate");
		Page<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientPatientId(patientId, request);
		List<PrescriptionDto> dtos = prescriptionMapper.prescriptionsToDto(prescriptionsPage.getContent());
		return new PageImpl<>(dtos, request, prescriptionsPage.getTotalElements());
	}

	/**
	 * Gets the patient prescription list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient prescription list
	 */
	public Page<PrescriptionDto> getPatientPrescriptionListAfterDate(String patientId, Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC,
				"expirationDate");
		Page<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientIdAndDateAfter(patientId, new Date(), request);
		List<PrescriptionDto> dtos = prescriptionMapper.prescriptionsToDto(prescriptionsPage.getContent());
		return new PageImpl<>(dtos, request, prescriptionsPage.getTotalElements());
	}
	// /**
	// * Gets the patient record by id.
	// *
	// * @param id
	// * the id
	// * @return the patient record by id
	// */
	// public MedicalRecord getPatientRecordById(Long id) {
	// return medicalRecordRepository.findOne(id);
	// }

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
	public boolean updatePatientPassword(String oldPassword, final String newPassword, String patientId) {
		Patient pat = patientRepository.findOne(patientId);
		if (SHA256Encrypt.sswordEncoder.matches(oldPassword, pat.getPassword()) ) {
			pat.setPassword(SHA256Encrypt.sswordEncoder.encode(newPassword));
			patientRepository.save(pat);
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Adds the new patient.
	 *
	 * @param patient
	 *            the patient
	 */
	public void addNewPatient(Patient patient) {
		patientRepository.save(patient);
	}

	/**
	 * Gets the patient list without doctor.
	 *
	 * @return the patient list without doctor
	 */
	public Page<PatientDto> getPatientListWithoutDoctor(Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		Page<Patient> patientPage = patientRepository.findByIsActiveTrueAndDoctorIsNull(pageable.previousOrFirst());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage.getContent());
		return new PageImpl<>(dtos, request, patientPage.getTotalElements());
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
	public boolean patientLogin(String patientId, String password) {
		String dbPassword = patientRepository.findOne(patientId).getPassword();
		return SHA256Encrypt.sswordEncoder.matches(password, dbPassword);
	}

	/**
	 * Validate add new patient.
	 *
	 * @param patient
	 *            the patient
	 * @return true, if successful
	 */
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
	 * @param patientId
	 *            the patient id
	 */
	public void deactivatePatient(String patientId) {
		Patient patient = patientRepository.findOne(patientId);
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
		if (patientId.matches("\\d+")) {
			Patient patient = patientRepository.findOne(patientId);
			return patient != null ? patient.isActive() : false;
		} else {
			return false;
		}
	}

	/**
	 * Return all active paged patient list by doctor userName and searchValue
	 * (firstName, lastName, patientId)
	 *
	 * @param pageable
	 *
	 * @param userName
	 *            doctor userName
	 * @param searchValue
	 *            searchable value (firstName, lastName, patientId)
	 *
	 * @return paged list of patient
	 */

	public Page<PatientDto> getAllPagedPatientByDoctorAndBySearchValue(Pageable pageable, String userName,
			String searchValue) {
		Doctor doctor = doctorRepository.findByUserName(userName);
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		Page<Patient> patientPage = patientRepository.findAllActivePatientByDoctorIdAndSearchValue(searchValue, doctor,
				request);
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage.getContent());
		return new PageImpl<>(dtos, request, patientPage.getTotalElements());
	}

	/**
	 * Return all active paged patient list by searchValue (firstName, lastName)
	 * patientId)
	 *
	 * @param pageable
	 *
	 * @param searchValue
	 *            searchable value (firstName, lastName, patientId)
	 *
	 * @return paged list of patient
	 */

	public Page<PatientDto> getAllPagedPatientBySearchValue(Pageable pageable, String searchValue) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
	
		Page<Patient> 	patientPage = patientRepository.findByFirstNameStartingWithOrLastNameStartingWith(searchValue, searchValue,request);//findAllActivePatientBySearchValue(searchValue, request);
		
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage.getContent());
		return new PageImpl<>(dtos, request, patientPage.getTotalElements());
	}

	/**
	 * Return all active not bind patient by searchValue (firstName, lastName,
	 * patientId) patientId)
	 *
	 * @param pageable
	 *
	 * @param searchValue
	 *            searchable value (firstName, lastName, patientId)
	 *
	 * @return paged list of patient
	 */

	public Page<PatientDto> getPatientListWithoutDoctorBySearchValue(String searchValue, Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		Page<Patient> patientPage = patientRepository.findAllActiveNotBindPatientBySearchValue(searchValue, request);
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage.getContent());
		return new PageImpl<>(dtos, request, patientPage.getTotalElements());
	}

}
