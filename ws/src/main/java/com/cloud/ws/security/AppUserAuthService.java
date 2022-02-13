package com.cloud.ws.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.repository.AppUserRepository;

@Service
public class AppUserAuthService implements UserDetailsService {
	
	@Autowired
	AppUserRepository appUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser inDB = appUserRepository.findByUsername(username);
		if(inDB == null) 
			throw new UsernameNotFoundException("User not found");
		return new AppUserDetails(inDB);
	}

	
}
