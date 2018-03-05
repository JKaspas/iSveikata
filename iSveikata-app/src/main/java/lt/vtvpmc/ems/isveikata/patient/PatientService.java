package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import lt.vtvpmc.ems.isveikata.security.SHA256Encrypt;

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
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
	public Page<PatientDto> getAllPagedActivePatient(Pageable pageable) {
		PageRequest request = new PageRequest(pageable.getPageNumber(), pageable.getPageSize());
		List<Patient> patientPage = patientRepository.findByActive(
				getPageFrom(pageable), pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos, request, dtos.size());
	}

	/**
	 * Get all patient (paged list)
	 * 
	 * @param pageable
	 * @return
	 */
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
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
	@PreAuthorize("hasRole('Doctor')")
	public Page<PatientDto> getAllPagedPatientByDoctor(Pageable pageable, String userName) {
		Long doctorId = doctorRepository.findByUserName(userName).getId();
		List<Patient> patientPage = patientRepository.findPatientByDoctor(doctorId,
				getPageFrom(pageable),	pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);

	}

	@PreAuthorize("hasRole('Doctor')")
	public List getAllPagedPatientByDoctorForCsv(String userName) {
		Long doctorId = doctorRepository.findByUserName(userName).getId();
		List patientList = patientRepository.findAllPatientByDoctorCSV(doctorId);
		return patientList;
	}

	/**
	 * Gets the patient list.
	 *
	 * @return the patient list
	 */
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
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
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor') OR hasRole('Druggist')")
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
	@PreAuthorize("hasRole('Patient') OR hasRole('Doctor')")
	public Page<MedicalRecordDto> getPatientRecordList(String patientId, Pageable pageable) {
		List<MedicalRecord> medicalRecordPage = medicalRecordRepository.findAllByPatientPatientId(patientId,
				getPageFrom(pageable),	pageable.getPageSize());
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
	@PreAuthorize("hasRole('Patient') OR hasRole('Doctor') OR hasRole('Druggist')")
	public Page<PrescriptionDto> getPatientPrescriptionList(String patientId, Pageable pageable) {
		List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientPatientId(patientId,
				getPageFrom(pageable),	pageable.getPageSize());
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
	@PreAuthorize("hasRole('Druggist')")
	public List<PrescriptionDto> getPatientPrescriptionListAfterDate(String patientId) {
		List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientIdAndDateAfter(patientId,
				new Date());
		return prescriptionMapper.prescriptionsToDto(prescriptionsPage);
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
	@PreAuthorize("hasRole('Patient')")
	public boolean updatePatientPassword(String oldPassword, final String newPassword, String patientId) {
		Patient pat = patientRepository.findOne(patientId);
		if (SHA256Encrypt.sswordEncoder.matches(oldPassword, pat.getPassword())) {
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
	@PreAuthorize("hasRole('Admin')")
	public void addNewPatient(Patient patient) {
		patientRepository.save(patient);
	}

	/**
	 * Gets the patient list without doctor.
	 *
	 * @return the patient list without doctor
	 */
	@PreAuthorize("hasRole('Admin')")
	public Page<PatientDto> getPatientListWithoutDoctor(Pageable pageable) {
		List<Patient> patientPage = patientRepository.findByIsActiveTrueAndDoctorIsNull(
				getPageFrom(pageable),	pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
	}

	/**
	 * Validate add new patient.
	 *
	 * @param patient
	 *            the patient
	 * @return true, if successful
	 */
	@PreAuthorize("hasRole('Admin')")
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
	@PreAuthorize("hasRole('Admin')")
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
	@PreAuthorize("hasRole('Doctor')")
	public Page<PatientDto> getAllPagedPatientByDoctorAndBySearchValue(Pageable pageable, String userName,
			String searchValue) {
		Long doctorId = doctorRepository.findByUserName(userName).getId();
		List<Patient> patientPage = patientRepository.findAllActivePatientByDoctorIdAndSearchValue(searchValue,
				doctorId, getPageFrom(pageable),pageable.getPageSize());
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
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
	public Page<PatientDto> getAllPagedPatientBySearchValue(Pageable pageable, String searchValue) {
		List<Patient> patientPage = null;
		if (searchValue.matches("\\d+")) {
			patientPage = patientRepository.findAllPatientByPatientId(searchValue,
					getPageFrom(pageable),
					pageable.getPageSize());
		} else {
			patientPage = patientRepository.findAllPatientByGivenSearchValue(searchValue,
					getPageFrom(pageable),
					pageable.getPageSize());
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
	@PreAuthorize("hasRole('Admin')")
	public Page<PatientDto> getPatientListWithoutDoctorBySearchValue(String searchValue, Pageable pageable) {
		List<Patient> patientPage = patientRepository.findAllActiveNotBindPatientBySearchValue(searchValue,
				getPageFrom(pageable),
				pageable.getPageSize());
		List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
		return new PageImpl<>(dtos);
	}
	
	private int getPageFrom(Pageable pageable) {
		return pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize();
	}


}
