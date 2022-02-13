package com.cloud.ws.security;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.repository.AppUserRepository;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

	@Autowired
	AppUserRepository appUserRepository;
	
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		AppUser appUser = appUserRepository.findByUsername(username);
		if(appUser != null) {
			return false;
		}
		return true;
	}

}
