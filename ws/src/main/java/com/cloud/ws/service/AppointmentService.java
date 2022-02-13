package com.cloud.ws.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.domain.Appointment;
import com.cloud.ws.repository.AppUserRepository;
import com.cloud.ws.repository.AppointmentRepository;
import com.cloud.ws.request.ScheduleAppointmentRequest;

@Service
public class AppointmentService {
	
	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	AppUserRepository appUserRepository;
	
	@Autowired
	MailService mailService;

	public void scheduleAppointment(ScheduleAppointmentRequest request) {
		Appointment appointment = new Appointment();
		AppUser user = appUserRepository.findByUsername(request.getUsername());
		appointment.setDate(request.getDate());
		appointment.setSchedulerAppUser(user);
		appointmentRepository.save(appointment);
		
	}

	public List<Appointment> getAll() {
		return appointmentRepository.findAll();
	}

	public List<Appointment> getAllBasedOnDoctor(String username) {
		AppUser user = appUserRepository.findByUsername(username);
		return appointmentRepository.findAllBySchedulerAppUser(user);
	}

	public void deleteAppointment(Long id) {
		Appointment appointment = appointmentRepository.findById(id).get();
		if(appointment.getGetterAppUser()!=null) {
			mailService.sendCancelledMail(appointment);
		}
		appointmentRepository.deleteById(id);
	}

	public void getAppointment(Long id, String username) {
		AppUser user = appUserRepository.findByUsername(username);
		Appointment appointment = appointmentRepository.getById(id);
		appointment.setGetterAppUser(user);
		appointmentRepository.save(appointment);
	}

	public List<Appointment> getDoctorsAvailableAppointments(String username) {
		AppUser user = appUserRepository.findByUsername(username);
		List<Appointment> list = appointmentRepository.findAllBySchedulerAppUser(user);
		List<Appointment> availableList = new ArrayList<>();
		for(Appointment appointment : list) {
			if(appointment.getGetterAppUser() == null) {
				availableList.add(appointment);
			}
		}
		return availableList;
	}

	public List<Appointment> getAvailableTime(Date min, Date max) {
		List<Appointment> allList = appointmentRepository.findAll();
		List<Appointment> availableList = new ArrayList<>();
		min.setDate(min.getDate()-1);
		max.setDate(max.getDate()+1);
		for(Appointment appointment : allList) {
			if((appointment.getDate().after(min) && appointment.getDate().before(max)) && appointment.getGetterAppUser()==null) {
				availableList.add(appointment);
			}
		}
		return availableList;
		
	}

	public List<Appointment> getUsersAppointments(String username) {
		AppUser user = appUserRepository.findByUsername(username);
		return appointmentRepository.findAllByGetterAppUser(user);
		
	}

	public void cancelAppointment(Long id) {
		Appointment appointment = appointmentRepository.findById(id).get();
		appointment.setGetterAppUser(null);
		appointmentRepository.save(appointment);
	}
}
