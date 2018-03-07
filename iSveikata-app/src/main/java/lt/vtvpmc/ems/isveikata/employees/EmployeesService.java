package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lt.vtvpmc.ems.isveikata.IsveikataApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.vtvpmc.ems.isveikata.mappers.DoctorMapper;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.security.SHA256Encrypt;
import lt.vtvpmc.ems.isveikata.specialization.JpaSpecializationRepository;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;

/**
 * The Class EmployeesService.
 */
@Service
@Transactional
@PreAuthorize("hasRole('Admin')")
public class EmployeesService {

	/** The employees repository. */
	@Autowired
	private JpaEmployeesRepository<Employee> employeesRepository;

	/** The doctor Repository. */
	@Autowired
	private JpaEmployeesRepository<Doctor> doctorRepository;

	/** The patient repository. */
	@Autowired
	private JpaPatientRepository patientRepository;

	/** The specialization repository */
	@Autowired
	private JpaSpecializationRepository specializationRepository;

	@Autowired
	private DoctorMapper doctorMapper;



	/**
	 * Adds new user.
	 * 
	 * @param objectMap
	 *            the employee, specialization
	 */
	public boolean addEmployee(Map<String, Object> objectMap) {
		final ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper

		final Employee employee = mapper.convertValue(objectMap.get("employee"), Employee.class);
		final String specializationTitle =  mapper.convertValue(objectMap.get("specialization"), String.class);
		Specialization specialization = null;
		if (specializationTitle != null) {
			if(specializationRepository.findByTitle(specializationTitle) == null){
				specialization = new Specialization();
				specialization.setTitle(specializationTitle);
				specialization = specializationRepository.save(specialization);
			}else{
				specialization = specializationRepository.findByTitle(specializationTitle);
			}

			try {
				Doctor doctor = (Doctor) employeesRepository.save(employee);
				doctor.setSpecialization(specialization);
			}catch (IllegalArgumentException ex){
				IsveikataApplication.LOGGER.info("Doctor or specialization exeption... " + ex);
				return false;
			}

		} else {
			employeesRepository.save(employee);
		}
		return true;
	}

	/**
	 * Binds doctor to patient.
	 *
	 * @param doctorId
	 *            the doctor id
	 * @param patientId
	 *            the patient id
	 */
	public void bindDoctorToPatient(String doctorId, String patientId) {
		Patient patient = patientRepository.findOne(patientId);
		Doctor doctor = (Doctor) employeesRepository.findByUserName(doctorId);
		if (doctor instanceof Doctor) {
			doctor.getPatient().add(patient);
			patient.setDoctor(doctor);
		}
	}

	/**
	 * Gets the active doctors list.
	 *
	 * @return the active doctors list
	 */
	@PreAuthorize("hasRole('Admin')")
	public Page<DoctorDto> getActiveDoctorsList(Pageable pageable) {
		List<Doctor> doctorPage = doctorRepository.findAllDoctor(getPageFrom(pageable), pageable.getPageSize());
		List<DoctorDto> dtos = doctorMapper.doctorsToDto(doctorPage);
		return new PageImpl<>(dtos);
	}

	/**
	 * Get active Doctor list (paged) by searchValue (firstName, lastName)
	 * 
	 * @param searchValue
	 *            (firstName or lastName)
	 *
	 * @return the active doctor list by searchValue
	 */
	public Page<DoctorDto> getActiveDoctorBySearchValue(String searchValue, Pageable pageable) {
		List<Doctor> doctorPage = doctorRepository.findAllActiveDoctorBySearchValue(searchValue, getPageFrom(pageable),
				pageable.getPageSize());
		List<DoctorDto> dtos = doctorMapper.doctorsToDto(doctorPage);
		return new PageImpl<>(dtos);
	}

	/**
	 * Update user password.
	 *
	 * @param oldPassword
	 *            old password
	 * @param newPassword
	 *            new password
	 * @param userName
	 *            the user name
	 */
	@PreAuthorize("hasRole('Admin') or hasRole('Doctor') or hasRole('Druggist')")
	public boolean updateUserPassword(String oldPassword, final String newPassword, String userName) {
		Employee employee = employeesRepository.findByUserName(userName);
		if (SHA256Encrypt.sswordEncoder.matches(oldPassword, employee.getPassword())) {
			employee.setPassword(newPassword);
			employeesRepository.save(employee);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Validate if user exists.
	 *
	 * @param employee
	 *            the employee
	 * @return false if is
	 */
	public boolean validateAddNewUser(Employee employee) {
		Employee employeeDb = employeesRepository.findByUserName(employee.getUserName());
		return employeeDb == null;
	}

	/**
	 * Validates if patient not bind to doctor.
	 *
	 * @param doctorId
	 *            the doctor id
	 * @param patientId
	 *            the patient id
	 * @return true, if not
	 */
	public boolean validateBindDoctrorToPatient(String doctorId, String patientId) {
		Patient patient = patientRepository.findOne(patientId);
		Doctor doctor = (Doctor) employeesRepository.findByUserName(doctorId);
		if (doctor instanceof Doctor) {
			return patient.getDoctor() == null;
		} else {
			return false;
		}
	}

	/**
	 * Deactivate user.
	 *
	 * @param userName
	 *            the user name
	 */
	public void deactivateUser(String userName) {
		Employee emp = employeesRepository.findByUserName(userName);
		emp.setActive(false);
		employeesRepository.save(emp);
	}

	public boolean isUserActive(String userNanme) {
		Employee employee = employeesRepository.findByUserName(userNanme);
		return employee != null ? employee.isActive() : false;
	}

	private int getPageFrom(Pageable pageable) {
		return pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize();
	}

}
