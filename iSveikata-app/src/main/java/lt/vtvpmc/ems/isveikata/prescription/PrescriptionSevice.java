package lt.vtvpmc.ems.isveikata.prescription;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.JpaApiRepository;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@Service
@Transactional
public class PrescriptionSevice {

    @Autowired
    private JpaPrescriptionRepository prescriptionRepository;

    @Autowired
    private JpaApiRepository apiRepository;

    @Autowired
    private JpaPatientRepository patientRepository;

    public void createNewPrescription(Map<String, Object> map) {
        ObjectMapper mapper = new ObjectMapper();
        Prescription prescription = mapper.convertValue(map.get("prescription"), Prescription.class);
        Api api = mapper.convertValue(map.get("api"), Api.class);
        Long patientId = mapper.convertValue(map.get("patientId"), Long.class);

        if(patientId != null) {
            prescription.setPatient(patientRepository.findOne(patientId));
        }
        if(api != null) {
            prescription.setApi(api);
        }

        prescriptionRepository.save(prescription);
    }
}
