package lt.vtvpmc.ems.isveikata.employees;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface JpaEmployeesRepository extends JpaRepository<Employee, Long> {

}
// galima ir taip:
// public interface JpaEmployeesRepository<T extends Employee> extends JpaRepository<T, Long>{
// jei reiktų konkrečių repozitorijų, jas reiktų pasidaryti sekančiai:
// @Transactional
// public interface DoctorRepository extends JpaEmployeesRepository<Doctor> { /*
// ... */ }
// daugiau info
// http://blog.netgloo.com/2014/12/18/handling-entities-inheritance-with-spring-data-jpa/