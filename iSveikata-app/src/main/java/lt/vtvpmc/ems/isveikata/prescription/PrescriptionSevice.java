package lt.vtvpmc.ems.isveikata.prescription;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.IsveikataApplication;
import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.ApiStatDto;
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

	private String getUserName() {
		User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return loggedUser.getUsername();
	}

	private String getUserRole() {
		User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return loggedUser.getAuthorities().toString();
	}

	@PreAuthorize("hasRole('Doctor')")
	public void createNewPrescription(Map<String, Object> map) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Prescription prescription = mapper.convertValue(map.get("prescription"), Prescription.class);
			Api api = apiRepository.findByTitle(mapper.convertValue(map.get("apiTitle"), String.class));
			String patientId = mapper.convertValue(map.get("patientId"), String.class);
			Doctor doctor = (Doctor) employeesRepository
					.findByUserName(mapper.convertValue(map.get("userName"), String.class));
			if (patientId != null)
				prescription.setPatient(patientRepository.findOne(patientId));
			if (api != null) {
				prescription.setApi(api);
				api.setCounter(api.getCounter() + 1l);
			}
			if (doctor != null)
				prescription.setDoctor(doctor);
			prescriptionRepository.save(prescription);
			IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(),
					doctor.getUserName() + " created new precription for " + patientId);
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error create new prescription:" + e);
		}

	}

	@PreAuthorize("hasRole('Doctor') OR hasRole('Patient')")
	public List<PrescriptionDto> getAllPrescriptions() {
		try {
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching all prescriptions");
			return mapper.prescriptionsToDto(prescriptionRepository.findAll());

		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching all prescriptions:" + e);
			return null;
		}
	}

	@PreAuthorize("hasRole('Doctor')")
	public List<PrescriptionUsage> getAllPrescriptionUsages(Long prescriptionId) {
		try {
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching all prescription usages");
			return prescriptionRepository.findOne(prescriptionId).getPrescriptionUsage();

		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching prescription " + prescriptionId + " usage \r\n" + e);
			return null;
		}
	}

	@PreAuthorize("hasRole('Doctor') OR hasRole('Patient') OR hasRole('Druggist')")
	public PrescriptionDto getPrescription(Long prescriptionId) {
		try {
			IsveikataApplication.loggMsg(Level.FINE, getUserName(), getUserRole(), "fetching prescription");
			return mapper.prescriptionToDto(prescriptionRepository.findOne(prescriptionId));

		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error fetching prescription " + prescriptionId + "\r\n" + e);
			return null;
		}
	}

	@PreAuthorize("hasRole('Druggist')")
	public boolean createUsageForPrescription(Map<String, Object> map, Long prescriptionId) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			PrescriptionUsage prescriptionUsage = mapper.convertValue(map.get("usage"), PrescriptionUsage.class);
			String userName = mapper.convertValue(map.get("userName"), String.class);

			if (prescriptionUsage != null && prescriptionId != null && userName != null) {
				Prescription prescription = prescriptionRepository.findOne(prescriptionId);
				prescriptionUsage.setPrescription(prescription);
				prescription.addUsage();
				Api api = prescription.getApi();
				api.setCounter(api.getCounter() + 1);
				prescriptionUsage.setDruggist((Druggist) employeesRepository.findByUserName(userName));
				prescriptionUsageRepository.save(prescriptionUsage);
				IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(),
						"created usage for prescription id " + prescriptionId);
				return true;
			} else {
				IsveikataApplication.loggMsg(Level.INFO, getUserName(), getUserRole(),
						"failed create prescription, prescriptionUsage:" + prescriptionUsage + " prescriptionId:"
								+ prescriptionId + " userName:" + userName + " must not be null");
				return false;
			}
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, getUserName(), getUserRole(),
					"Error creating prescription:" + e);
			return false;
		}

	}

	public List<ApiStatDto> getPublicApiStatistics() {
		try {
			List<ApiStatDto> stat = new ArrayList<ApiStatDto>();
			List<Api> result = apiRepository.findAllByCounterGreaterThanOrderByCounterDesc(0l, new PageRequest(0, 10));
			for (Api api : result) {
				ApiStatDto apiStatDto = new ApiStatDto();
				apiStatDto.setDescription(api.getDescription());
				apiStatDto.setIngredientName(api.getTitle());
				apiStatDto.setUsedTimes(api.getCounter());
				stat.add(apiStatDto);
			}
			IsveikataApplication.loggMsg(Level.FINE, "public", "[public]", "fetching public API statistics");
			return stat;
		} catch (Exception e) {
			IsveikataApplication.loggMsg(Level.WARNING, "public", "[public]", "Error fetching public statistics " + e);
			return null;
		}

	}
}
