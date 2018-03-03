package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
public class EmployeesService implements UserDetailsService {

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

	private final static Logger LOGGER = Logger.getLogger(EmployeesService.class.getName());

	/**
	 * Adds new user.
	 * 
	 * @param employee
	 *            the employee
	 * @param specialization
	 */
	public void addEmployee(Employee employee, Specialization specialization) {
		if (employee instanceof Doctor) {
			Specialization spec = null;
			if (specializationRepository.findByTitle(specialization.getTitle()) == null) {
				spec = specializationRepository.save(specialization);
			} else {
				spec = specializationRepository.findByTitle(specialization.getTitle());
			}

			Doctor doctor = (Doctor) employeesRepository.save(employee);
			doctor.setSpecialization(spec);
		} else {
		}
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
	public Page<DoctorDto> getActiveDoctorsList(Pageable pageable) {
		List<Doctor> doctorPage = doctorRepository.findAllDoctor(
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
				pageable.getPageSize());
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
		//PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
		List<Doctor> doctorPage = doctorRepository.findAllActiveDoctorBySearchValue(
				searchValue,
				pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() * pageable.getPageSize(),
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
	public boolean updateUserPassword(String oldPassword, final String newPassword, String userName) {
		Employee employee = employeesRepository.findByUserName(userName);
		if (SHA256Encrypt.sswordEncoder.matches(newPassword, oldPassword)) {
			employee.setPassword(SHA256Encrypt.sswordEncoder.encode(newPassword));
			employeesRepository.save(employee);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * user password validation.
	 *
	 * @param userName
	 *            the user name
	 * @param password
	 *            the password
	 * @return true, if valid
	 */
	public boolean userLogin(String userName, String password) {
		String dbPassword = employeesRepository.findByUserName(userName).getPassword();
		return SHA256Encrypt.sswordEncoder.matches(password, dbPassword);
	}

	/**
	 * Gets the user type.
	 *
	 * @param userName
	 *            the user name
	 * @return the type
	 */
	public String getType(String userName) {
		Employee user = employeesRepository.findByUserName(userName);
		return user.getClass().getSimpleName().toLowerCase();
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

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		String fullName;
		String password;
		String role;
		
		LOGGER.info("UserName:" + userName + " Skaitmeninis?"+userName.matches("\\d+") );

		try {
			if (userName.matches("\\d+")) {
				Patient user = patientRepository.findOne(userName);
				fullName = user.getFirstName() + " " + user.getLastName();
				password = user.getPassword();
				role = "ROLE_" + user.getClass().getSimpleName();
			} else {
				Employee user = employeesRepository.findByUserName(userName);
				fullName = user.getFirstName() + " " + user.getLastName();
				password = user.getPassword();
				role = "ROLE_" + user.getClass().getSimpleName();
			}

		} catch (Exception e) {
			throw new UsernameNotFoundException(userName + " not found.");

		}
		return new org.springframework.security.core.userdetails.User(fullName,password,
				AuthorityUtils.createAuthorityList(new String[] { role }));
	}

}
