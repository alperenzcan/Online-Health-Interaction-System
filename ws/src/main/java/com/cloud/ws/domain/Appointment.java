package com.cloud.ws.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Entity
@Data
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false)
	private Date date;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="scheduledBy",nullable=false)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private AppUser schedulerAppUser;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="getBy",nullable=true)
	private AppUser getterAppUser;
}