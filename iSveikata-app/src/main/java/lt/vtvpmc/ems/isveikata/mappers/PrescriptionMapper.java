package lt.vtvpmc.ems.isveikata.mappers;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import lt.vtvpmc.ems.isveikata.prescription.PrescriptionDto;

@Mapper(componentModel = "spring")
public interface PrescriptionMapper {

	@Mappings({
			// @Mapping(source = "doctorUserName", target = "doctor"),
			// @Mapping(source = "patientId", target = "patient"),
			//@Mapping(source = "apiDto", target = "api") 
		})
	Prescription dtoToPrescription(PrescriptionDto prescriptionDto);

	@InheritInverseConfiguration
	PrescriptionDto prescriptionToDto(Prescription prescription);

	List<PrescriptionDto> prescriptionsToDto(List<Prescription> prescriptions);

}
