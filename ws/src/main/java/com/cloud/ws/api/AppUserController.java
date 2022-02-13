package com.cloud.ws.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.ws.domain.AppUser;
import com.cloud.ws.error.ApiError;
import com.cloud.ws.request.ContactRequest;
import com.cloud.ws.response.AppUserVM;
import com.cloud.ws.response.GenericResponse;
import com.cloud.ws.service.AppUserService;
import com.cloud.ws.service.MailService;

@RestController
@RequestMapping("/api/users")
public class AppUserController {
	
	@Autowired
	AppUserService appUserService;
	
	@Autowired
	MailService mailService;

	@PostMapping("/user")
	public GenericResponse signupAppUser(@Valid @RequestBody AppUser appUser) {
		appUserService.signupAppUser(appUser);
		return new GenericResponse("Kayıt tamamlandı");
	}
	
	@PostMapping("/doctor")
	public GenericResponse signupAppDoctor(@Valid @RequestBody AppUser appUser) {
		appUserService.signupAppDoctor(appUser);
		return new GenericResponse("Doktor kayıt edildi");
	}
	
	@DeleteMapping("/doctor")
	public GenericResponse deleteDoktor(@RequestParam Long id) {
		appUserService.deleteDoctor(id);
		return new GenericResponse("Doktor silindi");
	}
	
	@GetMapping("/doctors")
	public List<AppUserVM> getDoctors(){
		List<AppUser> doctorList = appUserService.getDoctors();
		List<AppUserVM> list = new ArrayList<AppUserVM>();
		for(AppUser appUser:doctorList) {
			list.add(new AppUserVM(appUser));
		}
		return list;
	}
	
	@GetMapping("/doctorsOnly")
	public List<AppUserVM> getDoctorsOnly(){
		List<AppUser> doctorList = appUserService.getDoctorsOnly();
		List<AppUserVM> list = new ArrayList<AppUserVM>();
		for(AppUser appUser:doctorList) {
			list.add(new AppUserVM(appUser));
		}
		return list;
	}
	
	@PostMapping("/contact")
	public GenericResponse contact(@RequestBody ContactRequest request) {
		mailService.contact(request);
		return new GenericResponse("Mesajınız gönderildi");
	}
	
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		ApiError error = new ApiError(400,"Validation error","api/users/user");
		Map<String,String> validationErrors = new HashMap<>();
		for(FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
			validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
		}
		error.setValidationErrors(validationErrors);
		return error;
	}
}
