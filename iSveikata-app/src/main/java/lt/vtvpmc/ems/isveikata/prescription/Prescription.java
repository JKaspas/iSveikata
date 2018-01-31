package lt.vtvpmc.ems.isveikata.prescription;


import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;
import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;

@Entity
@Setter
@Getter
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

    private long ingredientAmount;
    private String description;
    private long useAmount;

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setApi(Api api) {
        this.api = api;
    }


}
