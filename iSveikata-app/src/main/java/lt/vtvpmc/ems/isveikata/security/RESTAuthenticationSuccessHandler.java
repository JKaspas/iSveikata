package lt.vtvpmc.ems.isveikata.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class RESTAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String userRoles = "";
		for (GrantedAuthority authority : authentication.getAuthorities()) {
			if (userRoles.length() > 0)
				userRoles = userRoles + ";";
			userRoles = userRoles + authority.getAuthority();
		}
		userRoles = userRoles.replaceAll("ROLE_", "").toLowerCase();
		response.addHeader("Content-Type", "application/json; charset=utf-8");
		response.getWriter()
				.print("{\"fullName\":\"" + authentication.getName() + "\",\"role\":\"" + userRoles + "\"}");
		response.getWriter().flush();
		;
		clearAuthenticationAttributes(request);
		super.onAuthenticationSuccess(request, response, authentication);
	}
}