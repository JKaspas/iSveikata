package lt.vtvpmc.ems.isveikata.patient;

import java.util.List;

import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPatientRepository extends JpaRepository<Patient, Long> {

	List<Patient> findByIsActiveTrue();

	Page<Patient> findByIsActiveTrueAndDoctorIsNull(Pageable pageable);

	Page<Patient> findAllByDoctorUserName(String userName, Pageable pageable);

	Page<Patient> findByIsActiveTrue(Pageable pageable);
}
