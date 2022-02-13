package com.cloud.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.service.AppUserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner run(AppUserService appUserService) {
		return args -> {
//			appUserService.signupAppUser(new AppUser("user1", "P4ssword", "user1@server.com", "User1 Name"));
//			appUserService.signupAppUser(new AppUser("user2", "P4ssword", "user2@server.com", "User2 Name"));
//			
//			appUserService.signupAppDoctor(new AppUser("doctor1", "P4ssword", "doctor1@server.com", "Doctor1 Name"));
//			appUserService.signupAppDoctor(new AppUser("doctor2", "P4ssword", "doctor2@server.com", "Doctor2 Name"));
//			
//			appUserService.signupAppAdmin(new AppUser("admin1", "P4ssword", "admin1@server.com", "Admin1 Name"));
//			appUserService.signupAppAdmin(new AppUser("admin2", "P4ssword", "admin2@server.com", "Admin2 Name"));

		};
	}
}
