package lt.vtvpmc.ems.isveikata.mappers;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import lt.vtvpmc.ems.isveikata.prescription.PrescriptionDto;

@Mapper(componentModel = "spring", uses = { ApiMapper.class })
public interface PrescriptionMapper {

	// kaire is UI (DTO) desne Entity
	@Mappings({
			// @Mapping(source = "doctorUserName", target = "doctor"),
			// @Mapping(source = "patientId", target = "patient"),
			@Mapping(source = "apiDto", target = "api"), 
			@Mapping(source = "expirationDate", target = "expirationDate"),
			@Mapping(source = "prescriptionDate", target = "prescriptionDate"),
			@Mapping(source = "ingredientAmount", target = "ingredientAmount"),
			@Mapping(source = "description", target = "description"),
			@Mapping(source = "useAmount", target = "useAmount") })
	Prescription toPrescription(PrescriptionDto prescriptionDto);

	@InheritInverseConfiguration
	PrescriptionDto fromPrescription(Prescription prescription);

	List<PrescriptionDto> fromPrescriptions(List<Prescription> prescriptions);

	// String doctorUserName;
	// Long patientId;
	// String apiTitle;
	// Date expirationDate;
	// Date prescriptionDate;
	// Long ingredientAmount;
	// String description;
	// Long useAmount;
	// String units;
}
