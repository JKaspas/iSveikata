package lt.vtvpmc.ems.isveikata.employees;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lt.vtvpmc.ems.isveikata.employees.DTO.RecordAppointment;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.patient.PatientService;

/**
 * The Class EmployeesController.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeesController {

	/** The employees service. */
	@Autowired
	private EmployeesService employeesService;

	/** The medical record service. */
	@Autowired
	private MedicalRecordService medicalRecordService;

	/** The patient service. */
	@Autowired
	private PatientService patientService;

	/**
	 * Insert employee. Insert new employee into data base. URL: /api/admin/new/user
	 * 
	 * @param <T>
	 *            the generic type of users
	 * @param employee
	 *            the employee information
	 */
	@PostMapping("/admin/new/user")
	@ResponseStatus(HttpStatus.CREATED)
	private <T extends Employee> void insertEmployee(@RequestBody T employee) {
		employeesService.addEmployee(employee);
	}

	/**
	 * Insert patient. Insert new patient into data base. URL:
	 * /api/admin/new/patient
	 *
	 * @param patient
	 *            the new patient info from UI
	 */
	@PostMapping("/admin/new/patient")
	@ResponseStatus(HttpStatus.CREATED)
	private void insertPatient(@RequestBody Patient patient) {
		patientService.addNewPatient(patient);
	}

	/**
	 * Binding. Adds new bind between doctor and patient. URL:
	 * /api/admin/new/bind/{userName}/to/{patient_id}
	 * 
	 * @param userName
	 *            the doctor id
	 * @param patId
	 *            the patient id
	 */
	@PostMapping("/admin/new/bind/{userName}/to/{patient_id}")
	@ResponseStatus(HttpStatus.OK)
	private void binding(@PathVariable("userName") String userName, @PathVariable("patient_id") Long patId) {
		employeesService.bindDoctroToPatient(userName, patId);
	}

	/**
	 * Creates the record. Creates appointment record, using data from request body.
	 * In body additional must be specified doctro ID, patient ID and appoitment
	 * duration time.
	 * 
	 * URL: /api/doctor/new/record
	 *
	 * @param recordAppointment
	 *            the record from UI
	 */
	@PostMapping("/doctor/new/record")
	@ResponseStatus(HttpStatus.CREATED)
	private void createRecord(@RequestBody RecordAppointment recordAppointment) {
		medicalRecordService.createNewRecord(recordAppointment);
	}

	/**
	 * Gets all active doctors URL: /api/doctor
	 *
	 * @return list of all doctors
	 */
	@GetMapping("/doctor")
	private List<Doctor> getAllDoctors() {
		return employeesService.getDoctorsList();
	}

	/**
	 * Gets all active patient from given doctor URL: /api/doctor/{userName}
	 *
	 * @param userName
	 * @return list of all patient of current doctor
	 */
	@GetMapping("/doctor/{userName}")
	private List<Patient> getAllDoctorPatient(@PathVariable String userName) {
		return employeesService.getDoctorPatientList(userName);
	}

	/**
	 * Change employee password in data base. URL: /{userName}/password
	 * 
	 * @param fields
	 * 
	 * @param userName
	 * @throws NoSuchAlgorithmException
	 */
	@PutMapping("/{userName}/password")
	private void update(@RequestBody final Map<String, String> fields, @PathVariable final String userName)
			throws NoSuchAlgorithmException {
		employeesService.updateUserPassword(fields.get("password"), userName);
	}

	/**
	 * Login. URL: /user/login
	 * 
	 * @param fields
	 * @throws NoSuchAlgorithmException
	 * 
	 */
	@PostMapping("/user/login")
	@ResponseBody
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields) throws NoSuchAlgorithmException {
		if (employeesService.userLogin(fields.get("userName"), fields.get("password"))) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Būk sveikas, vartotojau " +  fields.get("userName"));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vartotojas nerastas, patikrinkit prisijungimo duomenis");
		}
	}

}
