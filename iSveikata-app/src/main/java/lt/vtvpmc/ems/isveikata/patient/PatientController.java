package lt.vtvpmc.ems.isveikata.patient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

}
