package lt.vtvpmc.ems.isveikata.prescription;

import java.util.Date;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.api.ApiDto;

@Data
public class PrescriptionDto {

    private String doctorUserName;
    private Long patientId;
//    private ApiDto apiDto;
    private Date expirationDate;
    private Date prescriptionDate;
    private Long ingredientAmount;
    private String description;
    private Long useAmount;
    private String units;

//    @OneToMany(mappedBy = "prescription")
//    private List<PrescriptionUsage> prescriptionUsage;
//

}
