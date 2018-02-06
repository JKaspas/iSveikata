package lt.vtvpmc.ems.isveikata.patient;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordDto;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;
import lt.vtvpmc.ems.isveikata.prescription.Prescription;

@RestController
@RequestMapping(value = "/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private MedicalRecordService medicalRecordService;

	// PATIENT: /api/patient
	//
	// GET:
	// 1. “/” → return List<Patient> (DOCTOR, ADMIN)
	// 2. “/{patient_id}/" → return active Patient
	// 3. “/{patient_id}/record” → return List<Record>
	// 4. “/{patient_id}/record/{record_id}” → return Record with appointmet with
	// doctor

	// . “/{patient_id}/recipe" → return List<Recipe> // kolkas nereikia

	// PUT:
	// 6. “/{patient_id}/password” → update Patient password

	/**
	 * Gets all active patients URL: /api/patient
	 *
	 * @return list of all patient
	 */
	@GetMapping("/")
	private List<Patient> getPatientList() {
		return patientService.getActivePatientList();
	}

	/**
	 * Gets all active and not bind with doctor patients URL: /api/patient
	 *
	 * @return all active and not bind with doctor patients
	 */
	@GetMapping("/notBind")
	private List<Patient> getPatientListWithoutDoctor() {
		return patientService.getPatientListWithoutDoctor();
	}

	/**
	 * Gets patient by patientId
	 * 
	 * @param patientId
	 * @return patient by patientId
	 */
	@GetMapping("/{patientId}")
	private Patient getPatientById(@PathVariable Long patientId) {
		return patientService.getPatient(patientId);
	}

	/**
	 * Gets all records URL: api/{patientId}/record
	 * 
	 * @param patientId
	 * @return list of all patient
	 */
	@GetMapping("/{patientId}/record")
	private List<MedicalRecord> getRecordList(@PathVariable("patientId") Long patientId) {
		return patientService.getPatientRecordList(patientId);
	}
	
//	Sort veikia, bet tada negrąžina medical record detalių.
//	@GetMapping("/{patientId}/record")
//    @ResponseStatus(HttpStatus.OK)
//    private List<MedicalRecordDto> getAllSortedMedicalRecords(){
//        return medicalRecordService.getSortedMedicalRecords();
//    }
	
	
	
	/**
	 * Gets all records URL: api/{patientId}/prescription
	 *
	 * @param patientId
	 * @return list of all patient
	 */
	@GetMapping("/{patientId}/prescription")
	private List<Prescription> getPrescriptionList(@PathVariable("patientId") Long patientId) {
		return patientService.getPatientPrescriptionList(patientId);
	}

//	/**
//	 * Gets record with appointmet and with doctor by record id URL:
//	 * "/record/{record_id}"
//	 * 
//	 * @param id
//	 * @return record with appointmet and with doctor by record id
//	 */
//	@GetMapping("/record/{record_id}")
//	private MedicalRecord getPatientRecordById(@PathVariable("record_id") Long id) {
//		return patientService.getPatientRecordById(id);
//	}

	/**
	 * Change patient password in data base. URL: /{patient_id}/password
	 * 
	 * @param fields
	 * 
	 * @param patientId
	 * @throws NoSuchAlgorithmException
	 */
	@PutMapping("/{patientId}/password")
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields, @PathVariable final Long patientId)
			throws NoSuchAlgorithmException {
		boolean passwordChangeIsValid = patientService.updatePatientPassword(fields.get("oldPassword"),fields.get("newPassword"), patientId);
		return passwordChangeIsValid ?
				ResponseEntity.status(HttpStatus.ACCEPTED).body("Slaptažodis pakeistas sekmingai") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neteisingas slaptažodis");
	}

	/**
	 * Login. URL: /patient/login
	 * 
	 * @param fields
	 */
	@PostMapping("/login")
	@ResponseBody
	private ResponseEntity<String> update(@RequestBody final Map<String, String> fields) {
		if (patientService.isPatientActive(fields.get("patientId"))
				&& (patientService.patientLogin(fields.get("patientId"), fields.get("password")))) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(
					"Sveiki, " + patientService.getPatient(Long.parseLong(fields.get("patientId"))).getFirstName());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Vartotojas nerastas, neteisingi prisijungimo duomenis");
		}
	}

}
