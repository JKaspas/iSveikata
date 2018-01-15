package lt.vtvpmc.ems.isveikata.patient;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

@RestController
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;
    
    private PatientService getPatientService() {
 		return patientService;
 	}

 	private void setPatientService(PatientService patientService) {
 		this.patientService = patientService;
 	}


//    PATIENT: /api/patient
//
//	GET:
//		“/”  → return List<Patient> (DOCTOR, ADMIN) 
//		“/{patient_id}/" → return Patient
//		“/{patient_id}/record” → return List<Record>
 	
//		“/{patient_id}/doctor/{doctor_id}/” → return List<Patient> 
//		“/{patient_id}/record/{record_id}” → return Record with appointmet with doctor
//		“/{patient_id}/recipe" → return List<Recipe>  // kolkas nereikia

//	PUT:
//		“/{patient_id}/password” → update Patient password
    
 // 1 Gauti Pacientu sarasa -> List<Patient> (DOCTOR, ADMIN)
 	@GetMapping("/")
 	private List<Patient> getPatientList() {
 	return getPatientService().getPatientList();
 	}

 	//2 Gauti Pacienta pagal id → return Patient
 	@GetMapping("/{personalCode}")
 	private Patient getPatientById(@PathVariable String personalCode) {
 		return patientService.getPatient(personalCode);
 	}

 	//3 Gauti Med.irasu sarasa pagal paciento id → return List<Record>"
 	@GetMapping("/{personalCode}/record")
 	private List<MedicalRecord> getRecordList(@PathVariable("personalCode") String personalCode) {
 		return patientService.getPatientRecordList(personalCode);
 	}
 	
 	//5“/{patient_id}/record/{record_id}” → return Record with appointmet with doctor?
 	@GetMapping("/record/{record_id}")
 	private MedicalRecord getPatientRecordById(@PathVariable("record_id") Long id) {
 		return patientService.getPatientRecordById(id);   
 	}
 	

 	@PutMapping("/{personalCode}/password")
 	private void update(@RequestBody final Patient patient, @PathVariable final String personalCode) {
 		patientService.updatePatientPassword(patient, personalCode);
 	}


 	
 	
 }

