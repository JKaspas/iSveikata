package lt.vtvpmc.ems.isveikata.prescription;

import java.util.Date;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.api.ApiDto;

@Data
public class PrescriptionDto {

    private Long id;
    private Date expirationDate;
    private Date prescriptionDate;
    private Long amount;
    private String apiTitle;
    private String apiUnits;
    private String description;
    private Long useAmount;
    private String doctorFullName;

}
