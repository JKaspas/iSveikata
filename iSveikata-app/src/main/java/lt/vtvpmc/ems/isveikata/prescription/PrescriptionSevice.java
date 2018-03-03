package lt.vtvpmc.ems.isveikata.prescription;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.ApiStatDto;
import lt.vtvpmc.ems.isveikata.api.JpaApiRepository;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.employees.Druggist;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.mappers.ApiMapper;
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

	@Autowired
	private ApiMapper apiMapper;
	
	@PreAuthorize("hasRole('Doctor')")
	public void createNewPrescription(Map<String, Object> map) {
		ObjectMapper mapper = new ObjectMapper();
		Prescription prescription = mapper.convertValue(map.get("prescription"), Prescription.class);
		Api api = apiRepository.findByTitle(mapper.convertValue(map.get("apiTitle"), String.class));
		String patientId = mapper.convertValue(map.get("patientId"), String.class);
		Doctor doctor = (Doctor) employeesRepository
				.findByUserName(mapper.convertValue(map.get("userName"), String.class));

		if (patientId != null) {
			prescription.setPatient(patientRepository.findOne(patientId));
		}
		if (api != null) {
			prescription.setApi(api);
		}
		if (doctor != null) {
			prescription.setDoctor(doctor);
		}

		prescriptionRepository.save(prescription);
	}
	
	@PreAuthorize("hasRole('Doctor') OR hasRole('Patient')")
	public List<PrescriptionDto> getAllPrescriptions() {
		return mapper.prescriptionsToDto(prescriptionRepository.findAll());
	}
	
	@PreAuthorize("hasRole('Doctor')")
	public List<PrescriptionUsage> getAllPrescriptionUsages(Long prescriptionId) {
		return prescriptionRepository.findOne(prescriptionId).getPrescriptionUsage();
	}
	
	@PreAuthorize("hasRole('Doctor') OR hasRole('Patient') OR hasRole('Druggist')")
	public PrescriptionDto getPrescription(Long prescriptionId) {
		return mapper.prescriptionToDto(prescriptionRepository.findOne(prescriptionId));
	}
	
	@PreAuthorize("hasRole('Druggist')")
	public boolean createUsageForPrescription(Map<String, Object> map, Long prescriptionId) {
		ObjectMapper mapper = new ObjectMapper();
		PrescriptionUsage prescriptionUsage = mapper.convertValue(map.get("usage"), PrescriptionUsage.class);
		String userName = mapper.convertValue(map.get("userName"), String.class);

		if (prescriptionUsage != null && prescriptionId != null && userName != null) {
			Prescription prescription = prescriptionRepository.findOne(prescriptionId);
			prescriptionUsage.setPrescription(prescription);
			prescription.addUsage();
			prescriptionUsage.setDruggist((Druggist) employeesRepository.findByUserName(userName));
			prescriptionUsageRepository.save(prescriptionUsage);
			return true;
		} else {
			return false;
		}
	}

	public List<ApiStatDto> getPublicApiStatistics() {
		List<ApiStatDto> stat = new ArrayList<ApiStatDto>();
		List<Object[]> result = prescriptionRepository.getPublicApiStatistics(new PageRequest(0, 10));
		for (Object[] o : result) {
			Api api = apiRepository.findOne((Long) o[0]);
			ApiStatDto apiStatDto = new ApiStatDto();
			apiStatDto.setDescription(api.getDescription());
			apiStatDto.setIngredientName(api.getTitle());
			apiStatDto.setUsedTimes((Long) o[1]);
			stat.add(apiStatDto);
		}
		return stat;
	}
}
