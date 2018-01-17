package lt.vtvpmc.ems.isveikata.employees;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.swing.plaf.BorderUIResource.EmptyBorderUIResource;
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

	public void bindDoctroToPatient(String docId, Long patId) {
		Patient patient = patientRepository.findOne(patId);
		Doctor doctor = (Doctor) employeesRepository.findByUserName(docId);
		if (doctor instanceof Doctor) {
			doctor.getPatient().add(patient);
			patient.setDoctor(doctor);
			
		}
	}

	public List<Doctor> getDoctorsList() {
		return employeesRepository.findAll()
				.stream()
				.filter((employee -> employee instanceof Doctor))
				.map(employee -> (Doctor) employee)
				.filter((doctor) -> doctor.isAcitve())
				.collect(Collectors.toList());
	}

	public List<Patient> getDoctorPatientList(String userName) {
		Doctor doctor = (Doctor)employeesRepository.findByUserName(userName);
		return doctor.getPatient().stream().filter(patient -> patient.isActive()).collect(Collectors.toList());
	}

	public void updateUserPassword(final String password, String userName) throws NoSuchAlgorithmException {
		Employee employee = employeesRepository.findByUserName(userName);
		employee.setPassword(Passwords.hashString(password));
		employeesRepository.save(employee);
	}

	public boolean userLogin(String userNanme, String password) throws NoSuchAlgorithmException {
		byte [] dbPassword = employeesRepository.findByUserName(userNanme).getPassword();
		return Passwords.isValid(Passwords.hashString(password), dbPassword);
	}
}
