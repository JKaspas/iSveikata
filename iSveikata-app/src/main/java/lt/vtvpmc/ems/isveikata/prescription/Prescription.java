package lt.vtvpmc.ems.isveikata.prescription;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.employees.Doctor;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.prescriptionUsage.PrescriptionUsage;

@Entity
@Data
public class Prescription implements Serializable {

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
    private Doctor doctor;

    @ManyToOne
    private Api api;

    @JsonIgnore
    @OneToMany(mappedBy = "prescription")
    private List<PrescriptionUsage> prescriptionUsage;

    private long ingredientAmount;
    private String description;
    private long useAmount;

    public void addUsage(){
        useAmount++;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setApi(Api api) {
        this.api = api;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<PrescriptionUsage> getPrescriptionUsage() {
        return prescriptionUsage;
    }
}
