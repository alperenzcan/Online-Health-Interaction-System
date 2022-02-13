package com.cloud.ws.request;

import java.util.Date;

import lombok.Data;

@Data
public class ScheduleAppointmentRequest {

	private Date date;
	private String username;
}
