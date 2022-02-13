package com.cloud.ws.response;

import com.cloud.ws.domain.AppUser;

import lombok.Data;

@Data
public class AppUserVMLogin {
	
	private Long id;
	private String username;
	private String email;
	private String name;
	private String role;

	public AppUserVMLogin(AppUser appUser) {
		this.id = appUser.getId();
		this.username = appUser.getUsername();
		this.email = appUser.getEmail();
		this.name = appUser.getName();
		this.role = appUser.getRole();
	}

}
