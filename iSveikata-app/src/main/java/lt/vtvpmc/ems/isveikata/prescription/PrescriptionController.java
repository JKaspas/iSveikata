package lt.vtvpmc.ems.isveikata.prescription;


import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/prescription")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {


    @Autowired
    private PrescriptionSevice prescriptionSevice;

    /**
     * Get all prescriptions
     *
     * @return List of all prescriptions
     */

    @GetMapping(value = "")
    @ResponseStatus(HttpStatus.OK)
    private List<Prescription> getAllPrescriptions(){
        return prescriptionSevice.getAllPrescriptions();
    }


    /**
     * Get all specific prescription prescriptionUsages
     * @param prescriptionId Prescription id
     *
     * @return List of all prescriptionUsages
     */

    @GetMapping(value = "/{prescriptionId}/usages")
    @ResponseStatus(HttpStatus.OK)
    private List<PrescriptionUsage> getAllPrescriptionUsages(@PathVariable final Long prescriptionId){
        return prescriptionSevice.getAllPrescriptionUsages(prescriptionId);
    }

    /**
     * Get specific prescription
     *
     * @param prescriptionId Prescription id
     *
     * @return prescription
     */

    @GetMapping(value = "/{prescriptionId}")
    @ResponseStatus(HttpStatus.OK)
    private Prescription getPrescription(@PathVariable final Long prescriptionId){
        return prescriptionSevice.getPrescription(prescriptionId);
    }
}
