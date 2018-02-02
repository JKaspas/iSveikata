package lt.vtvpmc.ems.isveikata.prescription;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;

@RestController
@RequestMapping(value = "/api/prescription")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

//ToDo 	get /api/prescription/{prescriptionId}/usages to DTO
	
    @Autowired
    private PrescriptionSevice prescriptionSevice;

    /**
     * Get all prescriptions
     *
     * @return List of all prescriptions
     */

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    private List<PrescriptionDto> getAllPrescriptions(){
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
    private PrescriptionDto getPrescription(@PathVariable final Long prescriptionId){
        return prescriptionSevice.getPrescription(prescriptionId);
    }
}
