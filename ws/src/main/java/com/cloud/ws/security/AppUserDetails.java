package com.cloud.ws.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.cloud.ws.domain.AppUser;

import lombok.Data;

@Data
public class AppUserDetails implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8670339228426332761L;
	
	AppUser appUser;
	
	public AppUserDetails(AppUser appUser) {
		this.appUser = appUser;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList(this.appUser.getRole());
	}

	@Override
	public String getPassword() {
		return appUser.getPassword();
	}

	@Override
	public String getUsername() {
		return appUser.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
