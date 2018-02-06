package lt.vtvpmc.ems.isveikata.prescription;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.JpaApiRepository;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.Druggist;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.mappers.PrescriptionMapper;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.JpaPrescriptionUsageRepository;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;

@Service
@Transactional
public class PrescriptionSevice {

    @Autowired
    private JpaPrescriptionRepository prescriptionRepository;

    @Autowired
    private JpaPrescriptionUsageRepository prescriptionUsageRepository;

    @Autowired
    private JpaPatientRepository patientRepository;

    @Autowired
    private JpaEmployeesRepository<?> employeesRepository;

    @Autowired
    private JpaApiRepository apiRepository;
    
    @Autowired
    private PrescriptionMapper mapper;

    public void createNewPrescription(Map<String, Object> map) {
        ObjectMapper mapper = new ObjectMapper();
        Prescription prescription = mapper.convertValue(map.get("prescription"), Prescription.class);
        Api api = apiRepository.findByTitle(mapper.convertValue(map.get("apiTitle"), String.class));
        Long patientId = mapper.convertValue(map.get("patientId"), Long.class);
        Doctor doctor = (Doctor) employeesRepository.findByUserName(mapper.convertValue(map.get("userName"), String.class));

        if(patientId != null) {
            prescription.setPatient(patientRepository.findOne(patientId));
        }
        if(api != null) {
            prescription.setApi(api);
        }
        if(doctor != null) {
            prescription.setDoctor(doctor);
        }

        prescriptionRepository.save(prescription);
    }
    
    public List<PrescriptionDto> getAllPrescriptions() {
        return mapper.prescriptionsToDto(prescriptionRepository.findAll());
    }

    public List<PrescriptionUsage> getAllPrescriptionUsages(Long prescriptionId) {
        return prescriptionRepository.findOne(prescriptionId).getPrescriptionUsage();
    }

    public PrescriptionDto getPrescription(Long prescriptionId) {
        return mapper.prescriptionToDto(prescriptionRepository.findOne(prescriptionId));
    }

    public boolean createUsageForPrescription(Map<String, Object> map, Long prescriptionId) {
        ObjectMapper mapper = new ObjectMapper();
        PrescriptionUsage prescriptionUsage = mapper.convertValue(map.get("usage"), PrescriptionUsage.class);
        String userName = mapper.convertValue(map.get("userName"), String.class);

        if(prescriptionUsage != null && prescriptionId != null && userName != null) {
            Prescription prescription = prescriptionRepository.findOne(prescriptionId);
            prescriptionUsage.setPrescription(prescription);
            prescription.addUsage();
            prescriptionUsage.setDruggist((Druggist) employeesRepository.findByUserName(userName));
            prescriptionUsageRepository.save(prescriptionUsage);
            return true;
        }else{
            return false;
        }
    }
}
