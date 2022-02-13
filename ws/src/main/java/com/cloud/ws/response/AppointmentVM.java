package com.cloud.ws.response;

import java.util.Date;

import com.cloud.ws.domain.Appointment;

import lombok.Data;

@Data
public class AppointmentVM {

	private Long id;
	private Date date;
	private AppUserVM schedulerAppUserVM;
	private AppUserVM getterAppUserVM;
	
	public AppointmentVM(Appointment appointment) {
		this.id = appointment.getId();
		this.date = appointment.getDate();
		this.schedulerAppUserVM = new AppUserVM(appointment.getSchedulerAppUser());
		if(appointment.getGetterAppUser()!=null) {
			this.getterAppUserVM = new AppUserVM(appointment.getGetterAppUser());
		}
		
	}
	
}
