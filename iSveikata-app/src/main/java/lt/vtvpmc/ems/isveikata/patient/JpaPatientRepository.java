package lt.vtvpmc.ems.isveikata.patient;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPatientRepository extends JpaRepository<Patient, Long> {

	List<Patient> findByIsActiveTrue();
	List<Patient> findByIsActiveTrueAndDoctorIsNull();
}
