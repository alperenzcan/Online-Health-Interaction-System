package com.cloud.ws.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cloud.ws.domain.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

	AppUser findByUsername(String username);

	List<AppUser> findByRole(String role);
	
}
