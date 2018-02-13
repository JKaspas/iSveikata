package lt.vtvpmc.ems.isveikata;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lt.vtvpmc.ems.isveikata.employees.Admin;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;

@Configuration
public class AdminInit {

	@Bean
	public CommandLineRunner createAdminOnCleanInstall(JpaEmployeesRepository<Admin> repo) {
		if (repo.count() == 0) {
			return (args) -> repo.save(new Admin("vardenis", "pavardenis", "root", Passwords.hashString("123")));
		} else {
			return null;
		}
	}

}
