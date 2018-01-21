package lt.vtvpmc.ems.isveikata.specialization;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class SpecializationController {

	@Autowired
	private SpecializationService specializationService;

	/**
	 * Creates new Specialization
	 *
	 * @param specialization
	 */
	@PostMapping("/specialization")
	private void createIcd(@RequestBody Specialization specialization) {
		specializationService.createSpecialization(specialization);
	}

	/**
	 * Gets all specialization
	 *
	 * @return all specialization
	 */
	@GetMapping("/specialization")
	private List<Specialization> getAllSpecialization() {
		return specializationService.getAllSpecialization();
	}
}
