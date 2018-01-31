package lt.vtvpmc.ems.isveikata.prescription;


import lombok.Data;
import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Prescription {

    @Id
    @GeneratedValue
    private long id;

    @Type(type = "date")
    private Date expirationDate;

    @Type(type = "date")
    private Date prescriptionDate;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Api api;

    @OneToMany(mappedBy = "prescription")
    private List<PrescriptionUsage> prescriptionUsage;

    private long substanceAmount;
    private String description;
    private long useAmount;

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setApi(Api api) {
        this.api = api;
    }


}
