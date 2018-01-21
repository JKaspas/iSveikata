package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.Passwords;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import lt.vtvpmc.ems.isveikata.patient.Patient;

@Service
@Transactional
public class EmployeesService {

	@Autowired
	private JpaEmployeesRepository employeesRepository;
	@Autowired
	private JpaPatientRepository patientRepository;

	public void addEmployee(Employee employee) {
		employeesRepository.save(employee);
	}

	public void bindDoctroToPatient(String doctorId, Long patientId) {
		Patient patient = patientRepository.findOne(patientId);
		Doctor doctor = (Doctor) employeesRepository.findByUserName(doctorId);
		if (doctor instanceof Doctor) {
			doctor.getPatient().add(patient);
			patient.setDoctor(doctor);
		}
	}

	public List<Doctor> getDoctorsList() {
		return employeesRepository.findAll().stream().filter((employee -> employee instanceof Doctor))
				.map(employee -> (Doctor) employee).filter((doctor) -> doctor.isAcitve()).collect(Collectors.toList());
	}

	public List<Patient> getDoctorPatientList(String userName) {
		Doctor doctor = (Doctor) employeesRepository.findByUserName(userName);
		return doctor.getPatient().stream().filter(patient -> patient.isActive()).collect(Collectors.toList());
	}

	public boolean updateUserPassword(String oldPassword, final String newPassword, String userName) {
		Employee employee = employeesRepository.findByUserName(userName);
		if(Passwords.isValid(employee.getPassword(), Passwords.hashString(oldPassword))) {
			employee.setPassword(newPassword);
			employeesRepository.save(employee);
			return true;
		}else{
			return false;
		}
	}

	public boolean userLogin(String userNanme, String password) {
		byte[] dbPassword = employeesRepository.findByUserName(userNanme).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
	}

	public String getType(String userName) {
		Employee user = employeesRepository.findByUserName(userName);
		return user.getClass().getSimpleName();
	}

	public boolean validateAddNewUser(Employee employee) {
		Employee employeeDb = employeesRepository.findByUserName(employee.getUserName());
		return employeeDb == null;
	}

	public boolean validateBindDoctroToPatient(String doctorId, Long patientId) {
		Patient patient = patientRepository.findOne(patientId);
		Doctor doctor = (Doctor) employeesRepository.findByUserName(doctorId);
		if (doctor instanceof Doctor) {
			return patient.getDoctor() == null;
		} else {
			return false;
		}
	}

	public void deactivateUser(String userName) {
		Employee emp = employeesRepository.findByUserName(userName);
		emp.setAcitve(false);
		employeesRepository.save(emp);
	}

	public boolean isUserActive(String userNanme) {
		Employee employee = employeesRepository.findByUserName(userNanme);
		return employee.isAcitve();
	}
}
