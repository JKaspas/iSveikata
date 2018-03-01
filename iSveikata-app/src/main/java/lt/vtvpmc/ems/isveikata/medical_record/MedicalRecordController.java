package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/record")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalRecordController {

	@Autowired
	private MedicalRecordService medicalRecordService;

	// /**
	// * Get all medical records
	// *
	// * @return List of all medical records
	// */
	//
	// @GetMapping
	// @ResponseStatus(HttpStatus.OK)
	// private List<MedicalRecordDto> getAllMedicalRecord(){
	// return medicalRecordService.getAllMedicalRecord();
	// }
	//
	// @GetMapping (value = "/sorted")
	// @ResponseStatus(HttpStatus.OK)
	// private List<MedicalRecordDto> getAllSortedMedicalRecords(){
	// return medicalRecordService.getSortedMedicalRecords();
	// }

	/**
	 * Get specific medical record
	 *
	 * @param medicalRecordId
	 *            medicalRecordId Medical record id
	 *
	 * @return medical record
	 */

	@GetMapping(value = "/{medicalRecordId}")
	@ResponseStatus(HttpStatus.OK)
	private MedicalRecordDto getMedicalRecord(@PathVariable final Long medicalRecordId) {
		return medicalRecordService.getMedicalRecord(medicalRecordId);
	}


	@GetMapping(value = "/doctor/{userName}/statistic/{dateFrom}/{dateTill}")
	@ResponseStatus(HttpStatus.OK)
	private List<Object> getDoctorWorkDaysStatistic(@PathVariable final String userName, @PathVariable final String dateFrom, @PathVariable final String dateTill){
		return medicalRecordService.getDoctorWorkDaysStatistic(userName, dateFrom, dateTill);
	}



	@GetMapping(value = "/statistic/TLK/")
	@ResponseStatus(HttpStatus.OK)
	private List<Map> getPublicTlkStatistics(){
		return medicalRecordService.publicTlkStatistics();
	}

}
