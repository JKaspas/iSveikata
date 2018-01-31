package lt.vtvpmc.ems.isveikata.prescription;

import lombok.Data;

import java.util.Date;


@Data
public class PrescriptionDto {

    String doctorUserName;
    Long patientId;
    String apiTitle;

    //prescription

    Date expirationDate;

    Date prescriptionDate;

    Long ingredientAmount;

    String description;

    Long useAmount;

    String units;

}
