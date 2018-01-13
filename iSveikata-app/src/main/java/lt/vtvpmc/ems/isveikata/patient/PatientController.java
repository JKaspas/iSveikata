package lt.vtvpmc.ems.isveikata.patient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

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
    
}
