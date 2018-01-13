package lt.vtvpmc.ems.isveikata.employees;


import lt.vtvpmc.ems.isveikata.appointment.AppointmentService;
import lt.vtvpmc.ems.isveikata.icd.IcdService;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordService;
import lt.vtvpmc.ems.isveikata.patient.PatientService;
import lt.vtvpmc.ems.isveikata.specialization.Specialization;
import lt.vtvpmc.ems.isveikata.specialization.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/")
public class EmployeesController {

    @Autowired
    private EmployeesService employeesService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private IcdService icdService;
    @Autowired
    private MedicalRecordService medicalRecordService;
    @Autowired
    private SpecializationService specializationService;
    @Autowired
    private PatientService patientService;
    
//	ToDo
//	user: /api
//	
	
//	POST:
//		“/new/user”→ return new User 
//		“/bind/{doctor_id}/{patient_id} → relate Doctor with Patient

//	doctor: /api
//		
//	POST:
//		“/doctor/{doctor_id}/record/{patient_id}” → return new Record for Patient with Doctor

}
