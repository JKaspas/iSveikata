package lt.vtvpmc.ems.isveikata.employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;

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

	/**
	 * Insert employee.
	 * Insert new employee into data base. 
	 * URL: /api/admin/new/user
	 *	
	 * @param <T> the generic type of users
	 * @param employee the employee information
	 */
	@PostMapping("/admin/new/user")
	@ResponseStatus(HttpStatus.CREATED)
	private <T extends Employee> void insertEmployee(@RequestBody T employee) {
		employeesService.addEmployee(employee);
	}

	/**
	 * Binding.
	 * Adds new bind between doctor and patient.
	 * URL: /api/admin/new/bind/{doctor_id}/to/{patient_id}
	 * 
	 * @param docId the doctor id
	 * @param patId the patient id
	 */
	@PostMapping("/admin/new/bind/{doctor_id}/to/{patient_id}")
	@ResponseStatus(HttpStatus.OK)
	private void binding(@PathVariable("doctor_id") String docId, @PathVariable("patient_id") String patId) {
		employeesService.bindDoctroToPatient(docId, patId);
	}

	/**
	 * Creates the record.
	 * Creates appointment record, using data from request body. In body additional must be specified doctro ID, patient ID and appoitment duration time.
	 * 
	 * URL: /api/doctor/new/record
	 *
	 * @param record the record from UI
	 */
	@PostMapping("/doctor/new/record")
	@ResponseStatus(HttpStatus.CREATED)
	private void createRecord(@RequestBody MedicalRecord record) {
		medicalRecordService.createNewRecord(record);
	}

}
