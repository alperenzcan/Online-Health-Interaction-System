package com.cloud.ws.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.cloud.ws.security.UniqueUsername;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="user")
public class AppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@NotEmpty
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@NotEmpty
	@Size(min = 8, max = 255)
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
	private String password;
	
	@NotNull
	@NotEmpty
	private String name;
	
	@NotNull
	@NotEmpty
	private String email;
	
	private String role;
	
	public AppUser(String username, String password, String email, String name ) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
	}
	
	
}
