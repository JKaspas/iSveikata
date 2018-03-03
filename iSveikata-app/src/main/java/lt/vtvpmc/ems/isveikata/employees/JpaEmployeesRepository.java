package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Transactional
public interface JpaEmployeesRepository<T extends Employee> extends JpaRepository<T, Long> {
	
	T findByUserName(String username);
	
	@Query(value = "SELECT * FROM EMPLOYEE WHERE DTYPE = LOWER(?1)", nativeQuery = true)
	//@Query("select e from Employee e where e.dtype = :type")
	List<T> findAllByType(String type);

	@Query(value = "SELECT * FROM EMPLOYEE WHERE DTYPE = 'doctor' and IS_ACTIVE = true LIMIT ?1, ?2", nativeQuery = true)
	List<Doctor> findAllDoctor(int from, int to);

//	@Query("SELECT t FROM Doctor t WHERE " +
//			"t.isActive = true AND  " +
//			"(LOWER(t.firstName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
//			"LOWER(t.lastName) LIKE LOWER(CONCAT('%',:searchValue, '%')))")
	@Query(value = "SELECT * FROM EMPLOYEE WHERE " +
			"DTYPE = 'doctor' and IS_ACTIVE = true " +
			"AND (first_name LIKE ?1% OR last_name LIKE ?1%)" +
			"LIMIT ?2, ?3", nativeQuery = true)
	List<Doctor> findAllActiveDoctorBySearchValue(String searchValue,
													int from, int to);
}
