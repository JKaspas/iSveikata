package lt.vtvpmc.ems.isveikata.employees.DTO;

import lt.vtvpmc.ems.isveikata.appointment.Appointment;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;

public class RecordAppointment {
    
    private MedicalRecord medicalRecord;
    private Appointment appointment;

    public MedicalRecord getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(MedicalRecord medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
