package lt.vtvpmc.ems.isveikata.patient;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaPatientRepository extends JpaRepository<Patient, String> {

	List<Patient> findByIsActiveTrue();

	@Query(value = "SELECT * FROM Patient WHERE " +
			"is_active = true AND  " +
			"doctor_id is null LIMIT ?1, ?2", nativeQuery = true)
	List<Patient> findByIsActiveTrueAndDoctorIsNull(int from, int to);

	@Query(value = "SELECT * FROM PATIENT WHERE IS_ACTIVE = TRUE AND DOCTOR_ID = ?1 LIMIT ?2, ?3", nativeQuery = true)
	List<Patient> findPatientByDoctor(Long doctorId, int from, int to);

	@Query(value = "SELECT first_name, last_name, patient_id, birth_date  FROM PATIENT WHERE IS_ACTIVE = TRUE AND DOCTOR_ID = ?1", nativeQuery = true)
	List<Object> findAllPatientByDoctorCSV(Long doctorId);

	@Query(value = "SELECT * FROM Patient  WHERE " +
			"IS_ACTIVE = true LIMIT ?1, ?2", nativeQuery = true)
	List<Patient> findByActive(int from, int to);

	@Query("SELECT t FROM Patient t WHERE " +
			"t.isActive = true AND  " +
			"t.patientId LIKE CONCAT(:patientId, '%') ")
	Page<Patient> findAllPatientByPatientId(@Param("patientId") String patientId, Pageable pageRequest);

//	@Query("SELECT t FROM Patient t WHERE " +
//			"t.isActive = true AND  " +
//			"t.doctor = :doctor AND " +
//			"(LOWER(t.firstName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.lastName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.patientId) LIKE LOWER(CONCAT(:searchValue, '%')))")
	@Query(value = "SELECT * FROM Patient WHERE " +
			"IS_ACTIVE = true  AND DOCTOR_ID = ?2 AND " +
			"(first_name LIKE ?1% OR last_name LIKE ?1%) LIMIT ?3, ?4", nativeQuery = true)
	List<Patient> findAllActivePatientByDoctorIdAndSearchValue(String searchValue,
														 Long doctorId, int from, int to);

//	@Query("SELECT t FROM Patient t WHERE " +
//			"t.isActive = true AND  " +
//			"(LOWER(t.firstName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.lastName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.patientId) LIKE LOWER(CONCAT(:searchValue, '%')))")
	@Query(value = "SELECT * FROM Patient WHERE " +
			"IS_ACTIVE = true  AND first_name LIKE ?1% " +
			"OR last_name LIKE ?1% LIMIT ?2, ?3", nativeQuery = true)
	List<Patient> findAllPatientByGivenSearchValue(String searchValue, int from, int to);

	@Query(value = "SELECT * FROM Patient WHERE " +
			"IS_ACTIVE = true AND patient_id LIKE ?1% " +
			"LIMIT ?2, ?3", nativeQuery = true)
	List<Patient> findAllPatientByPatientId(String searchValue, int from, int to);
	
//	@Query("SELECT t FROM Patient t WHERE " +
//			"t.isActive = true AND  " +
//			"t.patientId LIKE CONCAT(:searchValue, '%')")
//	Page<Patient> findAllActivePatientBySearchId(@Param("searchValue") String searchValue, Pageable pageRequest);
//
//	Page<Patient> findByFirstNameIgnoreCaseLikeOrLastNameIgnoreCaseLike(String firstName, String lastName, Pageable pageRequest);
	
//	Page<Patient> findByFirstNameStartingWithOrLastNameStartingWith(String firstName, String lastName, Pageable pageRequest);
	
//	@Query("SELECT t FROM Patient t WHERE " +
//			"(t.isActive = true AND  " +
//			"t.doctor IS NULL) AND" +
//			"(LOWER(t.firstName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.lastName) LIKE LOWER(CONCAT(:searchValue, '%')) OR " +
//			"LOWER(t.patientId) LIKE LOWER(CONCAT(:searchValue, '%')))")
	@Query(value = "SELECT * FROM Patient WHERE " +
			"is_active = true AND  doctor_id is null AND " +
			"(first_name LIKE ?1% OR last_name LIKE ?1% OR patient_id LIKE ?1%) " +
			"LIMIT ?2, ?3", nativeQuery = true)
	List<Patient> findAllActiveNotBindPatientBySearchValue(String searchValue, int from, int to);

}
