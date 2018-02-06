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

//	// kaire is UI (DTO) desne Entity
//	@Mappings({
//			// @Mapping(source = "doctorUserName", target = "doctor"),
//			// @Mapping(source = "patientId", target = "patient"),
//			@Mapping(source = "apiDto", target = "api") })
	Prescription toPrescription(PrescriptionDto prescriptionDto);

	@InheritInverseConfiguration
	PrescriptionDto fromPrescription(Prescription prescription);

	List<PrescriptionDto> fromPrescriptions(List<Prescription> prescriptions);

}
