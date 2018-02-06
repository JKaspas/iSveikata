package lt.vtvpmc.ems.isveikata.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsageDto;

@Mapper(componentModel = "spring", uses = { PrescriptionMapper.class })
public interface PrescriptionUsageMapper {

	@Mappings({
		@Mapping(source = "prescription", target = "prescriptionDto")
		})
	PrescriptionUsageDto prescriptionUsageToDto(PrescriptionUsage prescriptionUsage);

}
