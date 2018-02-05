package lt.vtvpmc.ems.isveikata.employees;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface JpaEmployeesRepository<T extends Employee> extends JpaRepository<T, Long> {
	
	T findByUserName(String username);
	
	@Query(value = "SELECT * FROM EMPLOYEE WHERE DTYPE = LOWER(?1)", nativeQuery = true)
	//@Query("select e from Employee e where e.dtype = :type")
	List<T> findAllByType(String type);

	@Query("select e from Doctor e")
	Page<Doctor> findAllDoctor(Pageable pageable);
}
// galima ir taip:
// public interface JpaEmployeesRepository<T extends Employee> extends JpaRepository<T, Long>{
// jei reiktų konkrečių repozitorijų, jas reiktų pasidaryti sekančiai:
// @Transactional
// public interface JpaDoctorRepository extends JpaEmployeesRepository<Doctor> { /*
// ... */ }
// daugiau info
// http://blog.netgloo.com/2014/12/18/handling-entities-inheritance-with-spring-data-jpa/