package lt.vtvpmc.ems.isveikata.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import lt.vtvpmc.ems.isveikata.specialization.Specialization;
import lt.vtvpmc.ems.isveikata.specialization.SpecializationDto;

@Mapper(componentModel = "spring") 
public interface SpecializationMapper {

	/**
	 * Convert to prescriptionUsage from prescriptionUsageDto.<br>
	 * source = DTO from UI, target = entity fields.
	 *
	 * @param PrescriptionUsageDto
	 *            the prescription usage data transfer object.
	 * @return the prescription usage
	 */
	Specialization dtoToSpecialization(SpecializationDto specializationDto);

	SpecializationDto specializationToDto(Specialization specialization);

	List<SpecializationDto> specializationsToDto(List<Specialization> specializations);
}
