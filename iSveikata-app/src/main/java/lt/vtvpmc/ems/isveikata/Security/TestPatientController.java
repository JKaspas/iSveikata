package lt.vtvpmc.ems.isveikata.Security;


import lt.vtvpmc.ems.isveikata.patient.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController

public class TestPatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping(value = "/")
    @ResponseStatus(HttpStatus.OK)
    public String test(){
        return "All good, for every one :)";
    }
    @GetMapping(value = "/login")
    @ResponseStatus(HttpStatus.OK)
    public String login(){
        return "All good (LOGIN), for every one :)";
    }
    @GetMapping(value = "/user")
    @ResponseStatus(HttpStatus.OK)
    public String user(){
        return "All good(USER), ONLY FOR USER :)";
    }

}
