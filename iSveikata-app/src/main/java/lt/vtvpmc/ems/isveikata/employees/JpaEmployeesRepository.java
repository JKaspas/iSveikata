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

	@Query("select e from Doctor e where isActive = true")
	Page<Doctor> findAllDoctor(Pageable pageable);

	@Query("SELECT t FROM Doctor t WHERE " +
			"t.isActive = true AND  " +
			"(LOWER(t.firstName) LIKE LOWER(CONCAT('%',:searchValue, '%')) OR " +
			"LOWER(t.lastName) LIKE LOWER(CONCAT('%',:searchValue, '%')))")
	Page<Doctor> findAllActiveDoctorBySearchValue(@Param("searchValue") String searchValue,
													Pageable pageable);
}
