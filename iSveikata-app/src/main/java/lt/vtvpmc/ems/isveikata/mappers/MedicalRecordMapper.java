package lt.vtvpmc.ems.isveikata.mappers;



import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.icd.Icd;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordDto;

@Mapper(componentModel = "spring")
public interface MedicalRecordMapper {
	@Mappings({
//		@Mapping(source = "appointment", target = "appointment"),
//		@Mapping(source = "icd", target = "icd"),
//		@Mapping(source = "isCompensable", target = "isCompensable"),
//		@Mapping(source = "isRepetitive", target = "isRepetitive") 
		})
	MedicalRecord toMedicalRecord(MedicalRecordDto medicalRecordDto);

	@InheritInverseConfiguration
	MedicalRecordDto fromMedicalRecord(MedicalRecord medicalRecord);

	List<MedicalRecordDto> fromMedicalRecords(List<MedicalRecord> medicalRecords);


}
