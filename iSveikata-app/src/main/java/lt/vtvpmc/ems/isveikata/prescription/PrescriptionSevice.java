package lt.vtvpmc.ems.isveikata.prescription;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.api.ApiDto;
import lt.vtvpmc.ems.isveikata.mappers.ApiMapper;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;

@Service
@Transactional
public class PrescriptionSevice {

    @Autowired
    private JpaPrescriptionRepository prescriptionRepository;

    @Autowired
    private JpaPatientRepository patientRepository;

    public void createNewPrescription(Map<String, Object> map) {
        ObjectMapper mapper = new ObjectMapper();
        Prescription prescription = mapper.convertValue(map.get("prescription"), Prescription.class);
        ApiDto apiDto = mapper.convertValue(map.get("api"), ApiDto.class);
        Long patientId = mapper.convertValue(map.get("patientId"), Long.class);

        if(patientId != null) {
            prescription.setPatient(patientRepository.findOne(patientId));
        }
        if(apiDto != null) {
            prescription.setApi(ApiMapper.MAPPER.toApi(apiDto));
        }

        prescriptionRepository.save(prescription);
    }
}
