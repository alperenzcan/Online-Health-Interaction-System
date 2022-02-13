package com.cloud.ws.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	AppUserAuthService appUserAuthService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.formLogin().disable();
		http.headers().frameOptions().disable();
		http.httpBasic().authenticationEntryPoint(new AuthenticationEntryPoint() {
			
			@Override
			public void commence(HttpServletRequest request, HttpServletResponse response,
					org.springframework.security.core.AuthenticationException authException)
					throws IOException, ServletException {
				response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
				
			}
		});

		http.authorizeRequests().antMatchers(HttpMethod.POST,"/api/auth").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.POST,"/api/users/doctor").hasAnyRole("ADMIN")
		.and()
		.authorizeRequests().antMatchers(HttpMethod.DELETE,"/api/users/doctor").hasAnyRole("ADMIN")
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/users/doctors").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.POST,"/api/users/contact").permitAll()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.POST,"/api/appointment").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/appointment/getAll").hasAnyRole("ADMIN")
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/appointment/doctorAppointment").hasAnyRole("ADMIN","DOCTOR")
		.and()
		.authorizeRequests().antMatchers(HttpMethod.DELETE,"/api/appointment").hasAnyRole("ADMIN","DOCTOR")
		.and()
		.authorizeRequests().antMatchers(HttpMethod.PUT,"/api/appointment").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/appointment/available/doctorAppointment").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.POST,"/api/appointment/availableTime").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/appointment/userAppointments").authenticated()
		.and()
		.authorizeRequests().antMatchers(HttpMethod.GET,"/api/appointment/cancel").authenticated()
		.and()
		.authorizeRequests().anyRequest().permitAll();
		
		
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(appUserAuthService)
		.passwordEncoder(passwordEncoder());
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
