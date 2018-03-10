package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.vtvpmc.ems.isveikata.IsveikataApplication;
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

	private String getUserName() {
		User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return loggedUser.getUsername();
	}

	private String getUserRole() {
		User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return loggedUser.getAuthorities().toString();
	}

	/**
	 * Get all patient (paged list)
	 * 
	 * @param pageable
	 * @return
	 */
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
	public Page<PatientDto> getAllPagedActivePatient(Pageable pageable) {

		try {
			PageRequest request = new PageRequest(pageable.getPageNumber(), pageable.getPageSize());
			List<Patient> patientPage = patientRepository.findByActive(getPageFrom(pageable), pageable.getPageSize());
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching all active patients.");
			return new PageImpl<>(dtos, request, dtos.size());
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching ptients list:" + e.getMessage());
			return null;
		}

	}

	/**
	 * Get all patient (paged list)
	 * 
	 * @param pageable
	 * @return
	 */
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
	public Page<Patient> getAllPatientByPatientId(String patientId, Pageable pageable) {
		try {
			PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching patient by patient id");
			return patientRepository.findAllPatientByPatientId(patientId, request);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list by patient id" + e.getMessage());
			return null;
		}

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
		try {
			Long doctorId = doctorRepository.findByUserName(userName).getId();
			List<Patient> patientPage = patientRepository.findPatientByDoctor(doctorId, getPageFrom(pageable),
					pageable.getPageSize());
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching patient list by dorctor");
			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list by dorctor" + e.getMessage());
			return null;
		}
	}

	@PreAuthorize("hasRole('Doctor')")
	public List<Object> getAllPagedPatientByDoctorForCsv(String userName) {
		try {
			Long doctorId = doctorRepository.findByUserName(userName).getId();
			List<Object> patientList = patientRepository.findAllPatientByDoctorCSV(doctorId);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient list for csv formation");

			return patientList;
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list for csv" + e.getMessage());
			return null;
		}

	}

	/**
	 * Gets the patient list.
	 *
	 * @return the patient list
	 */
	@PreAuthorize("hasRole('Admin') OR hasRole('Doctor')")
	public List<PatientDto> getActivePatientList() {
		try {
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching active patient list");
			return patientMapper.patiensToDto(patientRepository.findByIsActiveTrue());
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching active patient list" + e.getMessage());
			return null;
		}
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
		try {
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching patient by id");
			return patientMapper.patientToDto(patientRepository.findOne(patientId));
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient by id" + e.getMessage());
			return null;
		}

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
		try {
			List<MedicalRecord> medicalRecordPage = medicalRecordRepository.findAllByPatientPatientId(patientId,
					getPageFrom(pageable), pageable.getPageSize());
			List<MedicalRecordDto> dtos = medicalRecordMapper.medicalRecordsToDto(medicalRecordPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching patient record list");
			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching record list" + e.getMessage());
			return null;
		}

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
		try {
			List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientPatientId(patientId,
					getPageFrom(pageable), pageable.getPageSize());
			List<PrescriptionDto> dtos = prescriptionMapper.prescriptionsToDto(prescriptionsPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient prescription list");

			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient " + patientId + " prescription list" + e.getMessage());
			return null;
		}

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
		try {
			List<Prescription> prescriptionsPage = prescriptionRepository.findAllByPatientIdAndDateAfter(patientId,
					new Date());
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient precription list after date");

			return prescriptionMapper.prescriptionsToDto(prescriptionsPage);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient " + patientId + " prescription list after date" + e.getMessage());
			return null;
		}

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
		try {
			Patient pat = patientRepository.findOne(patientId);
			if (SHA256Encrypt.sswordEncoder.matches(oldPassword, pat.getPassword())) {
				pat.setPassword(SHA256Encrypt.sswordEncoder.encode(newPassword));
				patientRepository.save(pat);
				IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(), "change password sucess.");
				return true;
			} else {
				IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(), "change password fail.");

				return false;
			}
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error changing patient " + patientId + " password " + e.getMessage());
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
		try {
			patientRepository.save(patient);
			IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(),
					"created new patient with id " + patient.getPatientId());
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error creating patient " + patient.getPatientId() + e.getMessage());
		}
	}

	/**
	 * Gets the patient list without doctor.
	 *
	 * @return the patient list without doctor
	 */
	@PreAuthorize("hasRole('Admin')")
	public Page<PatientDto> getPatientListWithoutDoctor(Pageable pageable) {
		try {
			List<Patient> patientPage = patientRepository.findByIsActiveTrueAndDoctorIsNull(getPageFrom(pageable),
					pageable.getPageSize());
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient list not bind to any doctro");
			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list not bind to any doctor " + e.getMessage());
			return null;
		}

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
		try {
			if (patientRepository.exists(patient.getPatientId())) {
				IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "patient can be created");
				return false;
			} else {
				IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "patient can't be created");
				return true;
			}
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error validating patien " + patient.getPatientId() + "\r\n" + e.getMessage());
			return false;
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
		List<Patient> patientPage = new ArrayList<Patient>();
		try {
			Long doctorId = doctorRepository.findByUserName(userName).getId();
			if (searchValue.matches("\\d+")) {
				patientPage = patientRepository.findAllPatientByPatientIdAndDoctorId(doctorId, searchValue,
						getPageFrom(pageable), pageable.getPageSize());
			} else if (searchValue.matches("^[A-Z]{1}\\d{2}$")) {
				patientPage = patientRepository.findAllByDoctorIdAndIcdCode(doctorId, searchValue,
						getPageFrom(pageable), pageable.getPageSize());
			} else {
				patientPage = patientRepository.findAllActivePatientByDoctorIdAndSearchValue(searchValue, doctorId,
						getPageFrom(pageable), pageable.getPageSize());
			}
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient list by doctor " + userName + " and search value:" + searchValue);
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list by doctor " + userName + " and search value of " + searchValue
							+ " \r\n" + e.getMessage());
			return null;
		}

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
		try {
			List<Patient> patientPage = null;
			if (searchValue.matches("\\d+")) {
				patientPage = patientRepository.findAllPatientByPatientId(searchValue, getPageFrom(pageable),
						pageable.getPageSize());
			} else {
				patientPage = patientRepository.findAllPatientByGivenSearchValue(searchValue, getPageFrom(pageable),
						pageable.getPageSize());
			}
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient by search value:" + searchValue);

			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient by search value of " + searchValue + "\r\n" + e.getMessage());
			return null;
		}

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
		try {
			List<Patient> patientPage = patientRepository.findAllActiveNotBindPatientBySearchValue(searchValue,
					getPageFrom(pageable), pageable.getPageSize());
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient list not bind to doctor by value:" + searchValue);

			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list not bind to doctor by search value of " + searchValue + "\r\n"
							+ e.getMessage());
			return null;
		}

	}

	private int getPageFrom(Pageable pageable) {
		return pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize();
	}

	@PreAuthorize("hasRole('Doctor')")
	public Page<PatientDto> getAllPagedPatientByDoctorAndIcdCode(Pageable pageable, String userName, String icdCode) {
		try {
			Doctor doctor = doctorRepository.findByUserName(userName);
			List<Patient> patientPage = patientRepository.findAllByDoctorIdAndIcdCode(doctor.getId(), icdCode,
					getPageFrom(pageable), pageable.getPageSize());
			List<PatientDto> dtos = patientMapper.patiensToDto(patientPage);
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(),
					"fetching patient list to doctor by ICD code:" + icdCode);

			return new PageImpl<>(dtos);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching patient list by doctorid " + userName + " and ICD code of " + icdCode + "\r\n"
							+ e.getMessage());
			return null;
		}
	}

}
