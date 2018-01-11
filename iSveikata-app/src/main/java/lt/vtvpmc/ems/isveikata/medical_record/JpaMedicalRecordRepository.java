package lt.vtvpmc.ems.isveikata.medical_record;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
}
