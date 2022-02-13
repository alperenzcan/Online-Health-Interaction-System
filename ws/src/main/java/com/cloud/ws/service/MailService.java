package com.cloud.ws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cloud.ws.domain.Appointment;
import com.cloud.ws.request.ContactRequest;

@Service
public class MailService {

	@Autowired
	private JavaMailSender mailSender;
	
	public void sendCancelledMail(Appointment appointment) {
		
		String text = "" + appointment.getSchedulerAppUser().getName() + " ile olan " + appointment.getDate() + " tarihli randevunuz iptal edilmiştir"  ;
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("cloud.project.mailsender@gmail.com");
		message.setTo(appointment.getGetterAppUser().getEmail());
		message.setSubject("Randevu İptali");
		message.setText(text);
		
		mailSender.send(message);
		
	}

	public void contact(ContactRequest request) {
		
		String text = "Gönderen : " + request.getMailAddress() + "\nMessage :" + request.getMessage();
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("cloud.project.mailsender@gmail.com");
		message.setTo("ozcannalpe@gmail.com");
		message.setSubject("Contact");
		message.setText(text);
		mailSender.send(message);
	}
}
