package lt.vtvpmc.ems.isveikata.employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeesController {

	@Autowired
	private EmployeesService employeesService;
	@Autowired
	private MedicalRecordService medicalRecordService;

	// ToDo
	// user: /api
	//

	// POST:
	// “/new/user”→ return new User
	// visgi dar pakeisčiau kad admin panelė atsiskirtu tai tipo adresas
	// "/admin/new/user"

	@PostMapping("/admin/new/user")
	@ResponseStatus(HttpStatus.CREATED)
	private @ResponseBody <T extends Employee> T insertEmployee(@RequestBody T employee) {
		employeesService.addEmployee(employee);
		return employee;
	}

	// “/doctor/{doctor_id}/to/{patient_id} → relate Doctor with Patient
	// ir čia į "/admin/new/bind/{dId}/to/{pId}" tipo gal paskiau lengviau būtų per
	// security atskirti.

	@PostMapping("/admin/new/bind/{doctor_id}/to/{patient_id}")
	@ResponseStatus(HttpStatus.OK)
	private void binding(@PathVariable("doctor_id") String docId, @PathVariable("patient_id") String patId) {
		employeesService.bindDoctroToPatient(docId, patId);
	}

	// “/doctor/{doctor_id}/record/{patient_id}” → return new Record for Patient
	// with Doctor
	// o visgi gal recordas pareina su jau imontuotu patient_id ir doctor_id ir tada
	// reiktų tiesiog add new record tipo taip:

	@PostMapping("/doctor/new/record")
	@ResponseStatus(HttpStatus.CREATED)
	private void createRecord(@RequestBody MedicalRecord record) {
		medicalRecordService.createNewRecord(record);
	}

}
