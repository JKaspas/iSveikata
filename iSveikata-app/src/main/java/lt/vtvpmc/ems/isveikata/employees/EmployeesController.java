package lt.vtvpmc.ems.isveikata.employees;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;
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
@CrossOrigin(origins = "*")
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
	 * Insert user. Insert new user into data base with unique userName. Return
	 * response if userName is not unique. URL: /api/admin/new/user
	 *
	 * @param <T>
	 *            the generic type
	 * @param map
	 *            map with two object Employee and Specialization
	 * @return the response entity
	 */
	@PostMapping("/admin/new/user")
	private <T extends Object> ResponseEntity<String> insertUserValid(@RequestBody Map<String, Object> map) {
		final ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
		final Employee employee = mapper.convertValue(map.get("employee"), Employee.class);
		final Specialization specialization =  mapper.convertValue(map.get("specialization"), Specialization.class);
		final String drugStore = mapper.convertValue(map.get("drugStore"), String.class);

		if (employeesService.validateAddNewUser(employee)) {
			employeesService.addEmployee(employee, specialization, drugStore);
			return ResponseEntity.status(HttpStatus.CREATED).body("Sukurtas naujas vartotojas");
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
					.body("Vartotojas su tokiu prisijungimo slapyvardžiu jau egzistuoja");
		}
	}

	/**
	 * Insert patient. Insert new patient into data base with unique patientId.
	 * Return response if patientId is not unique. URL: /api/admin/new/patient
	 *
	 * @param patient
	 *            the new patient info from UI
	 * @return the response entity
	 */
	@PostMapping("/admin/new/patient")
	private ResponseEntity<String> insertPatientValid(@RequestBody Patient patient) {
		if (patientService.validateAddNewPatient(patient)) {
			patientService.addNewPatient(patient);
			return ResponseEntity.status(HttpStatus.CREATED).body("Sukurtas naujas pacientas");
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
					.body("Pacientas su tokiu asmens kodu jau egzistuoja");
		}
	}

	// Validuoti kad naujai priskiriami pacientai gydytojui neturi priskirto
	// paciento ir kad gydytojui nera priskirtas tas pacientas.
	/**
	 * Binding. Adds new bind between doctor and patient with validation is patient
	 * not bind to doctor. URL: /api/admin/new/bind/{userName}/to/{patientId}
	 *
	 * @param userName
	 *            the doctor id
	 * @param patientId
	 *            the patient id
	 * @return the response entity
	 */
	@PostMapping("/admin/new/bind/{userName}/to/{patientId}")
	private ResponseEntity<String> bindingValid(@PathVariable String userName, @PathVariable Long patientId) {
		if (employeesService.validateBindDoctrorToPatient(userName, patientId)) {
			employeesService.bindDoctorToPatient(userName, patientId);
			return ResponseEntity.status(HttpStatus.CREATED).body("Pacientas priskirtas daktarui");
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
					"Pacientas jau buvo priskirtas daktarui anksciau, arba bandote priskirti pacienta ne daktarui");
		}
	}

	/**
	 * Creates the record. Creates appointment record, using data from request body.
	 * In body additional must be specified doctro ID, patient ID and appoitment
	 * duration time.
	 * 
	 * URL: /api/doctor/new/record
	 *
	 * @param map
	 *            with 4 object : MedicalRecord, Appointment, Strin patientId, Strin userName
	 */
	@PostMapping("/doctor/new/record")
	@ResponseStatus(HttpStatus.CREATED)
	private <T extends Object> void createRecord(@RequestBody Map<String, Object> map) {
		medicalRecordService.createNewRecord(map);
	}

	/**
	 * Gets all active doctors URL: /api/doctor.
	 *
	 * @return list of all doctors
	 */
	@GetMapping("/doctor")
	private List<Doctor> getAllDoctors() {
		return employeesService.getActiveDoctorsList();
	}

	/**
	 * Gets all active patient from given doctor URL: /api/doctor/{userName}.
	 *
	 * @param userName
	 *            the user name
	 * @return list of all patient of current doctor
	 */
	@GetMapping("/doctor/{userName}/patient")
	private List<Patient> getAllDoctorPatient(@PathVariable String userName) {
		return employeesService.getDoctorPatientList(userName);
	}

	/**
	 * Change employee password in data base. URL: /{userName}/password
	 *
	 * @param fields
	 *            the fields
	 * @param userName
	 *            the user name
	 */
	@PutMapping("/{userName}/password")
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields, @PathVariable final String userName) {
		boolean passwordChangeIsValid = employeesService.updateUserPassword(fields.get("oldPassword"), fields.get("newPassword"), userName);
		return passwordChangeIsValid ? ResponseEntity.status(HttpStatus.ACCEPTED).body("Slaptažodis pakeistas sekmingai") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neteisingas slaptažodis");

	}

	/**
	 * Login. URL: /user/login
	 *
	 * @param fields
	 *            the fields
	 * @return the response entity
	 * @throws NoSuchAlgorithmException
	 *             the no such algorithm exception
	 */
	@PostMapping("/user/login")
	@ResponseBody
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields)
			throws NoSuchAlgorithmException {
		if ((employeesService.isUserActive(fields.get("userName")))
				&& (employeesService.userLogin(fields.get("userName"), fields.get("password")))) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(getUserType(fields.get("userName")).toLowerCase());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Vartotojas nerastas arba yra neaktyvuotas, patikrinkit prisijungimo duomenis");
		}
	}

	/**
	 * Returns the user type.
	 *
	 * @param userName
	 *            the user name
	 * @return the user type
	 */
	private String getUserType(String userName) {
		return employeesService.getType(userName);
	}

	/**
	 * Gets all active and not bind with doctor patients URL: /api/doctor/notbind.
	 *
	 * @return all active and not bind with doctor patients
	 */
	@GetMapping("/doctor/notbind")
	private List<Patient> getPatientListWithoutDoctor() {
		return patientService.getPatientListWithoutDoctor();
	}

	/**
	 * Delete user.
	 *
	 * @param userName
	 *            the user name
	 */
	@DeleteMapping("/admin/delete/user/{userName}")
	private void deleteUser(@PathVariable String userName) {
		employeesService.deactivateUser(userName);
	}

	/**
	 * Delete patient.
	 *
	 * @param patientId
	 *            the patient id
	 */
	@DeleteMapping("/admin/delete/patient/{patientId}")
	private void deletePatient(@PathVariable Long patientId) {
		patientService.deactivatePatient(patientId);
	}

}
