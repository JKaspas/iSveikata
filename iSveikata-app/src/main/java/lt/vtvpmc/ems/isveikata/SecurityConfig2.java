package lt.vtvpmc.ems.isveikata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@Order(2)
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig2 extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private SecurityEntryPoint securityEntryPoint;
	
	@Autowired
	private UserDetailsService userDetails;

	@Override
	protected void configure(HttpSecurity http) throws Exception {


	http
	.authorizeRequests()
	// be saugumo UI dalis ir swaggeris
		.antMatchers("/", "/swagger-ui.html").permitAll()
	// visi /api/ saugus (dar galima .anyRequest() )
		.antMatchers("/api/**").authenticated()
	.and()
		.formLogin() // leidziam login
	// prisijungus
		.successHandler((req,res,auth)->{    //Success handler invoked after successful authentication
	         for (GrantedAuthority authority : auth.getAuthorities()) {
	             System.out.println(authority.getAuthority());
	          }
	        
	          res.getWriter().print("{\"fullName\":\"" + auth.getName() + "\"}");
	          res.getWriter().flush();
//	          res.addCookie(new Cookie("userName", auth.getName()));
//	          res.addHeader("userName", auth.getName());
	          res.sendRedirect("/"); // Redirect user to index/home page
	       })
//		.successHandler(new SimpleUrlAuthenticationSuccessHandler())
	// esant blogiems user/pass
		.failureHandler(new SimpleUrlAuthenticationFailureHandler())
		.loginPage("/api/patient/login").permitAll() // jis jau egzistuoja !
		.usernameParameter("userName").passwordParameter("password")
	.and()
		.logout()
//		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		.permitAll() // leidziam /logout
	.and()
		.csrf().disable() // nenaudojam tokenu
	// toliau forbidden klaidai
		.exceptionHandling()
		.authenticationEntryPoint(securityEntryPoint)
	.and()
		.headers().frameOptions().disable(); // H2 konsolei
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new SHA256Encrypt(); 
	}
	
		
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)	throws Exception {
		auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder());
	}
}