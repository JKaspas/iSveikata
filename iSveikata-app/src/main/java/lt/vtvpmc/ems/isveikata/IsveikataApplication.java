package lt.vtvpmc.ems.isveikata;

import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lt.vtvpmc.ems.isveikata.employees.EmployeesService;

@SpringBootApplication
public class IsveikataApplication {
	
	public final static Logger LOGGER = Logger.getLogger(EmployeesService.class.getName());

	public static void main(String[] args) {
		SpringApplication.run(IsveikataApplication.class, args);
	}
}
