package lt.vtvpmc.ems.isveikata;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lt.vtvpmc.ems.isveikata.employees.Admin;
import lt.vtvpmc.ems.isveikata.employees.JpaEmployeesRepository;

@Configuration
public class AdminInit {

	@Bean
	public CommandLineRunner naujasP1(JpaEmployeesRepository repo) {
		if (repo.findAll().size() > 0) {
			return null;
		} else {
			return (args) -> repo.save(new Admin("vardenis", "pavardenis", "root", "202cb962ac59075b964b07152d234b70"));
		}
	}
}
