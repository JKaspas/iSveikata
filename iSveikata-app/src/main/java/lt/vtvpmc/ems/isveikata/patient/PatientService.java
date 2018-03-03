package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.Passwords;
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
		PageRequest request = new PageRequest(pageable.getPageNumber(), pageable.getPageSize());
		List<Patient> patientPage = patientRepository.findByActive(
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos, request, dtos.size());
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
		PageRequest request = new PageRequest(pageable.getPageNumber(), pageable.getPageSize());
		Long doctorId = doctorRepository.findByUserName(userName).getId();
		List<Patient> patientPage = patientRepository.findPatientByDoctorUserName(
						doctorId,
						pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
						pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);

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
//		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC,
//				"id");
		List<MedicalRecord> medicalRecordPage = medicalRecordRepository.findAllByPatientPatientId(
				patientId,
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize() );
		List<MedicalRecordDto> dtos = medicalRecordMapper.medicalRecordsToDto(medicalRecordPage);
		return new PageImpl<>(dtos);
	}

	/**
	 * Gets the patient prescription list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient prescription list
	 */
	public Page<PrescriptionDto> getPatientPrescriptionList(String patientId, Pageable pageable) {

		List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientPatientId(
				patientId,
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize());
		List<PrescriptionDto> dtos = prescriptionMapper.prescriptionsToDto(prescriptionsPage);
		return new PageImpl<>(dtos);
	}

	/**
	 * Gets the patient prescription list.
	 *
	 * @param patientId
	 *            the patient id
	 * @return the patient prescription list
	 */
	public List<PrescriptionDto> getPatientPrescriptionListAfterDate(String patientId) {
		List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientIdAndDateAfter(patientId, new Date());
		return prescriptionMapper.prescriptionsToDto(prescriptionsPage);
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
		if (Passwords.isValid(pat.getPassword(), Passwords.hashString(oldPassword))) {
			pat.setPassword(newPassword);
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
		List<Patient> patientPage = patientRepository.findByIsActiveTrueAndDoctorIsNull(
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
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
		byte[] dbPassword = patientRepository.findOne(patientId).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
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
		Long doctorId = doctorRepository.findByUserName(userName).getId();
		List<Patient> patientPage = patientRepository.findAllActivePatientByDoctorIdAndSearchValue(
				searchValue,
				doctorId,
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
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
		//PageRequest request = new PageRequest(pageable.getPageNumber(), pageable.getPageSize());
		List<Patient> 	patientPage = null;
		if(searchValue.matches("\\d+")){
			System.out.println("Number!");
			patientPage = patientRepository.findAllPatientByPatientId(searchValue,
					pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
					pageable.getPageSize());
		}else{
			System.out.println("Not number!");
			patientPage = patientRepository.findAllPatientByGivenSearchValue(
					searchValue,
					pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
					pageable.getPageSize() );
		}
		
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
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
		List<Patient> patientPage = patientRepository.findAllActiveNotBindPatientBySearchValue(
				searchValue,
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize() );
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
	}


}
