package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

	List<MedicalRecord> findAllByOrderByIdDesc();

	Page<MedicalRecord> findAllByPatientPatientId(Long patientId, Pageable request);

}