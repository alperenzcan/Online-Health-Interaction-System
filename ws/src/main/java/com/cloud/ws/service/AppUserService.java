package com.cloud.ws.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.domain.Appointment;
import com.cloud.ws.repository.AppUserRepository;
import com.cloud.ws.repository.AppointmentRepository;

@Service
public class AppUserService {
	
	@Autowired
	AppUserRepository appUserRepository;
	
	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	public void signupAppUser(AppUser appUser) {
		appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
		appUser.setRole("ROLE_USER");
		appUserRepository.save(appUser);
		
	}

	public void signupAppDoctor(AppUser appUser) {
		appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
		appUser.setRole("ROLE_DOCTOR");
		appUserRepository.save(appUser);
	}
	
	public void signupAppAdmin(AppUser appUser) {
		appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
		appUser.setRole("ROLE_ADMIN");
		appUserRepository.save(appUser);
	}

	public List<AppUser> getDoctors() {
		List<AppUser> list = appUserRepository.findByRole("ROLE_DOCTOR");
		List<AppUser> listAdmin = appUserRepository.findByRole("ROLE_ADMIN");
		list.addAll(listAdmin);
		return list;
	}
	
	public List<AppUser> getDoctorsOnly() {
		return appUserRepository.findByRole("ROLE_DOCTOR");
	}

	public void deleteDoctor(Long id) {
		Optional<AppUser> user = appUserRepository.findById(id);
		List<Appointment> list = appointmentRepository.findAllByGetterAppUser(user);
		for(Appointment appointment : list) {
			appointment.setGetterAppUser(null);
		}
		appUserRepository.deleteById(id);
	}
}
