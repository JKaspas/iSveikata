package lt.vtvpmc.ems.isveikata.employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeesService {

    @Autowired
    private JpaEmployeesRepository employeesRepository;

	public void addEmployee(Employee employee) {
		System.out.println(employee.toString());
		employeesRepository.save(employee);
	}

	public void bindDoctroToPatient(String docId, String patId) {
		// TODO Auto-generated method stub
		
	}
}
