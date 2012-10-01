package lt.vtvpmc.ems.isveikata.patient;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.vtvpmc.ems.isveikata.employees.Doctor;

public interface JpaPatientRepository extends JpaRepository<Patient, Long> {

	List<Patient> findByIsActiveTrue();

	Page<Patient> findByIsActiveTrueAndDoctorIsNull(Pageable pageable);

	Page<Patient> findAllByDoctorUserName(String userName, Pageable pageable);

	Page<Patient> findByIsActiveTrue(Pageable pageable);

	@Query("SELECT t FROM Patient t WHERE " +
			"t.isActive = true AND  " +
			"LOWER(t.patientId) LIKE LOWER(CONCAT('%',:patientId, '%')) ")
	Page<Patient> findAllPatientByPatientId(@Param("patientId") Long patientId,
											Pageable pageRequest);

	@Query("SELECT t FROM Patient t WHERE " +
			"t.isActive = true AND  " +
			"t.doctor = :doctor AND " +
			"(LOWER(t.firstName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.lastName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.patientId) LIKE LOWER(CONCAT('%',:searchValue, '%')))")
	Page<Patient> findAllActivePatientByDoctorIdAndSearchValue(@Param("searchValue") String searchValue,
														 @Param("doctor") Doctor doctor,
														 Pageable pageRequest);

	@Query("SELECT t FROM Patient t WHERE " +
			"t.isActive = true AND  " +
			"(LOWER(t.firstName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.lastName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.patientId) LIKE LOWER(CONCAT('%',:searchValue, '%')))")
	Page<Patient> findAllActivePatientBySearchValue(@Param("searchValue") String searchValue,
														 Pageable pageRequest);

	@Query("SELECT t FROM Patient t WHERE " +
			"(t.isActive = true AND  " +
			"t.doctor IS NULL) AND" +
			"(LOWER(t.firstName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.lastName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.patientId) LIKE LOWER(CONCAT('%',:searchValue, '%')))")
	Page<Patient> findAllActiveNotBindPatientBySearchValue(@Param("searchValue") String searchValue, Pageable pageable);
}
