package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import lt.vtvpmc.ems.isveikata.patient.Patient;

/**
 * The Class EmployeesService.
 */
@Service
@Transactional
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

	/**
	 * Adds new user.
	 *
	 * @param employee the employee
	 */
	public void addEmployee(Employee employee) {
		employeesRepository.save(employee);
	}

	/**
	 * Binds doctor to patient.
	 *
	 * @param doctorId the doctor id
	 * @param patientId the patient id
	 */
	public void bindDoctorToPatient(String doctorId, Long patientId) {
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
	public List<Doctor> getActiveDoctorsList() {
		return doctorRepository.findAllByType(Doctor.class.getSimpleName());
	}

	/**
	 * Gets the doctor patient list.
	 *
	 * @param userName the user name
	 * @return the doctor patient list
	 */
	public List<Patient> getDoctorPatientList(String userName) {
		Doctor doctor = (Doctor) employeesRepository.findByUserName(userName);
		return doctor.getPatient().stream().filter(patient -> patient.isActive()).collect(Collectors.toList());
	}

	/**
	 * Update user password.
	 *
	 * @param password the password
	 * @param userName the user name
	 */
	public void updateUserPassword(final String password, String userName) {
		Employee employee = employeesRepository.findByUserName(userName);
		employee.setPassword(password);
		employeesRepository.save(employee);
	}

	/**
	 * user password validation.
	 *
	 * @param userName the user name
	 * @param password the password
	 * @return true, if valid
	 */
	public boolean userLogin(String userName, String password) {
		byte[] dbPassword = employeesRepository.findByUserName(userName).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
	}

	/**
	 * Gets the user type.
	 *
	 * @param userName the user name
	 * @return the type
	 */
	public String getType(String userName) {
		Employee user = employeesRepository.findByUserName(userName);
		return user.getClass().getSimpleName().toLowerCase();
	}

	/**
	 * Validate if user exists.
	 *
	 * @param employee the employee
	 * @return false if is
	 */
	public boolean validateAddNewUser(Employee employee) {
		Employee employeeDb = employeesRepository.findByUserName(employee.getUserName());
		return employeeDb == null;
	}

	/**
	 * Validates if patient not bind to doctor.
	 *
	 * @param doctorId the doctor id
	 * @param patientId the patient id
	 * @return true, if not
	 */
	public boolean validateBindDoctrorToPatient(String doctorId, Long patientId) {
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
	 * @param userName the user name
	 */
	public void deactivateUser(String userName) {
		Employee emp = employeesRepository.findByUserName(userName);
		emp.setAcitve(false);
		employeesRepository.save(emp);
	}
}
