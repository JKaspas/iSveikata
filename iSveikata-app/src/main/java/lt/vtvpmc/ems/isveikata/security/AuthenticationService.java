package lt.vtvpmc.ems.isveikata.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.vtvpmc.ems.isveikata.IsveikataApplication;
import lt.vtvpmc.ems.isveikata.employees.Employee;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;
import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import lt.vtvpmc.ems.isveikata.patient.Patient;

@Service
public class AuthenticationService implements UserDetailsService {

	@Autowired
	private JpaEmployeesRepository<Employee> employeesRepository;

	@Autowired
	private JpaPatientRepository patientRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		String fullName;
		String password;
		String role;
		
		IsveikataApplication.LOGGER.info("User " + userName + " tries to log in");

		try {
			if (userName.matches("\\d+")) {
				Patient user = patientRepository.findOne(userName);
				fullName = user.getFirstName() + " " + user.getLastName();
				password = user.getPassword();
				role = "ROLE_" + user.getClass().getSimpleName();
			} else {
				Employee user = employeesRepository.findByUserName(userName);
				fullName = user.getFirstName() + " " + user.getLastName();
				password = user.getPassword();
				role = "ROLE_" + user.getClass().getSimpleName();
			}

		} catch (Exception e) {
			throw new UsernameNotFoundException(userName + " not found.");
		}

		IsveikataApplication.LOGGER.info("User " + fullName + " sucessfuly loged in with " + role);

		return new org.springframework.security.core.userdetails.User(fullName, password,
				AuthorityUtils.createAuthorityList(new String[] { role }));
	}
}
