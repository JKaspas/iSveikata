package lt.vtvpmc.ems.isveikata.prescription;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPrescriptionRepository extends JpaRepository<Prescription, Long> {
}
