package lt.vtvpmc.ems.isveikata.prescription;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPrescriptionRepository extends JpaRepository<Prescription, Long> {

    Page<Prescription> findAllByPatientPatientId(Long id, Pageable pageable);
}
