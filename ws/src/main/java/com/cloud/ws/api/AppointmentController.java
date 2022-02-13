package com.cloud.ws.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.ws.domain.Appointment;
import com.cloud.ws.request.DateParametersRequest;
import com.cloud.ws.request.ScheduleAppointmentRequest;
import com.cloud.ws.response.AppointmentVM;
import com.cloud.ws.response.GenericResponse;
import com.cloud.ws.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;

	@PostMapping
	public ResponseEntity<?> scheduleAppointment(@RequestBody ScheduleAppointmentRequest request) {
		if(request.getDate()!= null) {
			appointmentService.scheduleAppointment(request);
			return ResponseEntity.ok(new GenericResponse("Randevu oluşturuldu"));
		}else {
			return ResponseEntity.badRequest().body(new GenericResponse("Randevu oluşturulamadı"));
		}
	}
	
	@GetMapping("/getAll")
	public List<Appointment> getAll(){
		return appointmentService.getAll();
	}
	
	@GetMapping("/doctorAppointment")
	public List<AppointmentVM> getAllBasedOnDoctor(@RequestParam String username){
		List<Appointment> list = appointmentService.getAllBasedOnDoctor(username);
		List<AppointmentVM> listVM = new ArrayList<>();
		for(Appointment appointment : list) {
			listVM.add(new AppointmentVM(appointment));
		}
		return listVM;
	}
	
	@DeleteMapping
	public GenericResponse deleteAppointment(@RequestParam Long id) {
		appointmentService.deleteAppointment(id);
		return new GenericResponse("Randevu Silindi");
	}
	
	@PutMapping
	public GenericResponse getAppointment(@RequestParam Long id, @RequestParam String username) {
		appointmentService.getAppointment(id,username);
		return new GenericResponse("Randevu alındı");
	}
	
	@GetMapping("/available/doctorAppointment")
	public ResponseEntity<?> getDoctorsAvailableAppointments(@RequestParam String username){
		if(username!= null) {
			List<Appointment> list = appointmentService.getDoctorsAvailableAppointments(username);
			List<AppointmentVM> listVM = new ArrayList<>();
			for(Appointment appointment : list) {
			listVM.add(new AppointmentVM(appointment));
			}
		return ResponseEntity.ok(listVM);
		}
		return ResponseEntity.badRequest().body(new GenericResponse("Lütfen doktor seçin"));
	}
	
	@PostMapping("/availableTime")
	public List<AppointmentVM> getAvailableTime(@RequestBody DateParametersRequest request){
		List<Appointment> list = appointmentService.getAvailableTime(request.getMin(),request.getMax());
		List<AppointmentVM> listVM = new ArrayList<>();
		for(Appointment appointment : list) {
			listVM.add(new AppointmentVM(appointment));
		}
		return listVM;
	}
	
	@GetMapping("/userAppointments")
	public List<AppointmentVM> getUsersAppointments(@RequestParam String username){
		List<Appointment> list = appointmentService.getUsersAppointments(username);
		List<AppointmentVM> listVM = new ArrayList<>();
		for(Appointment appointment : list) {
			listVM.add(new AppointmentVM(appointment));
		}
		return listVM;
	}
	
	@GetMapping("/cancel")
	public GenericResponse cancelAppointment(@RequestParam Long id) {
		appointmentService.cancelAppointment(id);
		return new GenericResponse("Randevu iptal edildi");
	}
	
}
