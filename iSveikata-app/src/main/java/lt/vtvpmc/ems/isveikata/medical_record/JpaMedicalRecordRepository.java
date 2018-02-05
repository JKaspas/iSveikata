package lt.vtvpmc.ems.isveikata.medical_record;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface JpaMedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    Page<MedicalRecord> findAllByPatientPatientId(Long id, Pageable pageable);
}