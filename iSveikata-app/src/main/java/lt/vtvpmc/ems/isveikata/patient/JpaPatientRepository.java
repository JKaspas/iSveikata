package lt.vtvpmc.ems.isveikata.patient;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPatientRepository extends JpaRepository<Patient, Long> {
}
