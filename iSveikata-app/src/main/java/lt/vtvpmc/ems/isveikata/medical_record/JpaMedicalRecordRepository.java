package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.List;

import org.hibernate.annotations.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import lt.vtvpmc.ems.isveikata.appointment.Appointment;

public interface JpaMedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

	List<MedicalRecord> findAllByOrderByIdDesc();

	

}