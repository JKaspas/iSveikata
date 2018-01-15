package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
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
	 * Insert patient. Insert new patient into data base. URL: /api/admin/new/patient
	 *
	 * @param patient the new patient info from UI
	 */
	@PostMapping("/admin/new/patient")
	@ResponseStatus(HttpStatus.CREATED)
	private void insertPatient(@RequestBody Patient patient) {
		patientService.addNewPatient(patient);
		}

	/**
	 * Binding. Adds new bind between doctor and patient. URL:
	 * /api/admin/new/bind/{doctor_id}/to/{patient_id}
	 * 
	 * @param docId
	 *            the doctor id
	 * @param patId
	 *            the patient id
	 */
	@PostMapping("/admin/new/bind/{doctor_id}/to/{patient_id}")
	@ResponseStatus(HttpStatus.OK)
	private void binding(@PathVariable("doctor_id") String docId, @PathVariable("patient_id") String patId) {
		employeesService.bindDoctroToPatient(docId, patId);
	}

	/**
	 * Creates the record. Creates appointment record, using data from request body.
	 * In body additional must be specified doctro ID, patient ID and appoitment
	 * duration time.
	 * 
	 * URL: /api/doctor/new/record
	 *
	 * @param record
	 *            the record from UI
	 */
	@PostMapping("/doctor/new/record")
	@ResponseStatus(HttpStatus.CREATED)
	private void createRecord(@RequestBody MedicalRecord record) {
		medicalRecordService.createNewRecord(record);
	}
	

	/**
	 * Gets all doctors
	 * URL: /api/doctor
	 *
	 * @return list of all doctors
	 */
	@GetMapping("/doctor")
	private List<Doctor> getAllDoctors(){
		return employeesService.getDoctorsList();
	}
}
