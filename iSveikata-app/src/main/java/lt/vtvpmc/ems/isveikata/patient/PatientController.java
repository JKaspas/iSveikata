package lt.vtvpmc.ems.isveikata.patient;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordDto;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;
import lt.vtvpmc.ems.isveikata.prescription.PrescriptionDto;

@RestController
@RequestMapping(value = "/api/patient")
@CrossOrigin(origins = "*")
public class PatientController {

	@Autowired
	private PatientService patientService;

	@Autowired
	private MedicalRecordService medicalRecordService;
	
	/**
	 * Gets all active patients URL: /api/patient
	 *
	 * @return list of all patient
	 */
	@GetMapping("/")
	private Page<PatientDto> getPagedPatient(Pageable pageable) {
		return patientService.getAllPagedActivePatient(pageable);
	}

	/**
	 * Gets all active patients by searchValue(firstName, lastName, patientId) URL:
	 * /api/patient/search/{searchValue}
	 *
	 * @return list of all patient
	 */
	@GetMapping("/search/{searchValue}")
	private Page<PatientDto> getPagedPatientBySearchValue(@PathVariable String searchValue, Pageable pageable) {
		return patientService.getAllPagedPatientBySearchValue(pageable, searchValue);
	}

	/**
	 * Gets all active and not bind with doctor patients URL: /api/doctor/notbind.
	 *
	 * @return all active and not bind with doctor patients
	 */
	@GetMapping("/notbind")
	private Page<PatientDto> getPatientListWithoutDoctor(Pageable pageable) {
		return patientService.getPatientListWithoutDoctor(pageable);
	}
	/**
	 * Gets all active and not bind with doctor patients by searchValue (firstName, lastName, patientId)
	 *
	 * @return all active and not bind with doctor patients
	 */
	@GetMapping("/notbind/{searchValue}/search")
	private Page<PatientDto> getPatientListWithoutDoctor(@PathVariable String searchValue, Pageable pageable) {
		return patientService.getPatientListWithoutDoctorBySearchValue(searchValue, pageable);
	}

	/**
	 * Gets patient by patientId
	 * 
	 * @param patientId
	 * @return patient by patientId
	 */
	@GetMapping("/{patientId}")
	private PatientDto getPatientById(@PathVariable Long patientId) {
		return patientService.getPatient(patientId);
	}

	/**
	 * Gets all records URL: api/{patientId}/record
	 * 
	 * @param patientId
	 * @return list of all patient
	 */
	@GetMapping("/{patientId}/record")
	private Page<MedicalRecordDto> getRecordList(@PathVariable("patientId") Long patientId, Pageable pageable) {
		return patientService.getPatientRecordList(patientId, pageable);
	}

	/**
	 * Gets all records URL: api/{patientId}/prescription
	 *
	 * @param patientId
	 * @return list of all patient
	 */
	@GetMapping("/{patientId}/prescription")
	private Page<PrescriptionDto> getPrescriptionList(@PathVariable("patientId") Long patientId, Pageable pageable) {
		return patientService.getPatientPrescriptionList(patientId, pageable);
	}

	// /**
	// * Gets record with appointmet and with doctor by record id URL:
	// * "/record/{record_id}"
	// *
	// * @param id
	// * @return record with appointmet and with doctor by record id
	// */
	// @GetMapping("/record/{record_id}")
	// private MedicalRecord getPatientRecordById(@PathVariable("record_id") Long
	// id) {
	// return patientService.getPatientRecordById(id);
	// }

	/**
	 * Change patient password in data base. URL: /{patient_id}/password
	 * 
	 * @param Map
	 *            with oldPassword and newPssword keys
	 * 
	 * @param patientId
	 *            as path variable
	 * 
	 */
	@PutMapping("/{patientId}/password")
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields,
			@PathVariable final Long patientId) {
		boolean passwordChangeIsValid = patientService.updatePatientPassword(fields.get("oldPassword"),
				fields.get("newPassword"), patientId);
		return passwordChangeIsValid
				? ResponseEntity.status(HttpStatus.ACCEPTED).body("Slaptažodis pakeistas sekmingai")
				: ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neteisingas slaptažodis");
	}

	/**
	 * Login. URL: /patient/login Checks if entered password matches saved in db.
	 * 
	 * @param Map
	 *            with patientId and password keys
	 * 
	 * @return HttpStatus with message
	 */
	@PostMapping("/login")
	@ResponseBody
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields) {
		if (patientService.isPatientActive(fields.get("patientId"))
				&& (patientService.patientLogin(fields.get("patientId"), fields.get("password")))) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(
					"Sveiki, " + patientService.getPatient(Long.parseLong(fields.get("patientId"))).getFullName());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Vartotojas nerastas, neteisingi prisijungimo duomenis");
		}
	}

}
