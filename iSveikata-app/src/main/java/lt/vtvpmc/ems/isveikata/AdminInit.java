package lt.vtvpmc.ems.isveikata;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lt.vtvpmc.ems.isveikata.employees.Admin;

@Configuration
public class AdminInit {

	@Bean
	public Admin naujasP1() {
		return new Admin("vardenis", "pavardenis", "root", "202cb962ac59075b964b07152d234b70");
	}

}
