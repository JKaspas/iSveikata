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
			return (args) -> repo.save(new Admin("vardenis", "pavardenis", "root", "A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3"));
		}
	}
}
