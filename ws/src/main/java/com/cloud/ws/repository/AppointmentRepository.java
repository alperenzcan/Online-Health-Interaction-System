package com.cloud.ws.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.domain.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	List<Appointment> findAllBySchedulerAppUser(AppUser appUser);
	
	List<Appointment> findAllByGetterAppUser(Optional<AppUser> user);
	
	List<Appointment> findAllByGetterAppUser(AppUser user);
	
}
