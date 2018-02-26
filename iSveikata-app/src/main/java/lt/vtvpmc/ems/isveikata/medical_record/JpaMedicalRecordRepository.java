package lt.vtvpmc.ems.isveikata.medical_record;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JpaMedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

	List<MedicalRecord> findAllByOrderByIdDesc();

	Page<MedicalRecord> findAllByPatientPatientId(String patientId, Pageable request);

	// @Query("SELECT a.DATE, count(*) as visits, sum(a.DURATION) as duration " +
	// "FROM t medicalRecord join a appointment " +
	// "on t.appointmentId = a.id " +
	// "where t.doctorId = 594" +
	// "and a.DATE > '2000-01-01' " +
	// "and a.DATE < '2016-01-01' " +
	// "group by a.DATE order by a.DATE", nativeQuery = true)
	// SELECT DATE, count(*) as visits, sum(DURATION) as duration FROM
	// MEDICAL_RECORD join APPOINTMENT on MEDICAL_RECORD.APPOINTMENT_ID =
	// APPOINTMENT.ID where MEDICAL_RECORD.DOCTOR_ID = 594
	// and APPOINTMENT.DATE > '2000-01-01' and APPOINTMENT.DATE < '2016-01-01' group
	// by DATE order by DATE
	@Query(value = "SELECT DATE, count(*) as visits, " + "sum(DURATION) as duration   FROM MEDICAL_RECORD "
			+ "join APPOINTMENT on MEDICAL_RECORD.APPOINTMENT_ID = APPOINTMENT.ID "
			+ "where MEDICAL_RECORD.DOCTOR_ID = ?1 " + "and APPOINTMENT.DATE > ?2 " + "and APPOINTMENT.DATE < ?3 "
			+ "group by DATE order by DATE", nativeQuery = true)
	List<Object> getDoctorWorkDaysStatistic(Long doctorId, String dateFrom, String dateTill);

	@Query("SELECT mr.icd, count(*) AS total FROM MedicalRecord mr GROUP BY mr.icd ORDER BY count(*) DESC ")
	List<Object> getPublicTlkStatistics(Pageable pageable);

}
