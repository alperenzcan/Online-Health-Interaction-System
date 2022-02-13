package com.cloud.ws.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.repository.AppUserRepository;
import com.cloud.ws.response.AppUserVMLogin;
import com.cloud.ws.security.AppUserDetails;

@RestController
public class AuthController {
	
	@Autowired
	AppUserRepository appUserRepository;
	
	@PostMapping("/api/auth")
	ResponseEntity<?> login(){
		AppUserDetails appUserDetails = (AppUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = appUserDetails.getUsername();
		AppUser inDB = appUserRepository.findByUsername(username);
		AppUserVMLogin user = new AppUserVMLogin(inDB);
		return ResponseEntity.ok(user);
	}
}
