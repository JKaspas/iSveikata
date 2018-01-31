package lt.vtvpmc.ems.isveikata.mappers;


import lt.vtvpmc.ems.isveikata.prescription.Prescription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PrescriptionMapper {
    PrescriptionMapper MAPPER = Mappers.getMapper(PrescriptionMapper.class);

//    @Mappings({
//            @Mapping(source = "doctorUserName", target="doctor.userName"),
//            @Mapping(source="patientId", target="patient.patientId"),
//            @Mapping(source = "apiTitle", target="api.title"),
//            @Mapping(source = "expirationDate", target = "prescription.expirationDate"),
//            @Mapping(source = "prescriptionDate", target = "prescription.prescriptionDate"),
//            @Mapping(source = "ingredientAmount", target = "prescription.ingredientAmount"),
//            @Mapping(source = "description", target = "prescription.description"),
//            @Mapping(source = "useAmount", target = "prescription.useAmount"),
//            @Mapping(source = "units", target = "papi.title") });


}
