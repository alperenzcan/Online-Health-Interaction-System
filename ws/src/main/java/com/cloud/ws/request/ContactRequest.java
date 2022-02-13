package com.cloud.ws.request;

import lombok.Data;

@Data
public class ContactRequest {

	private String mailAddress;
	private String message;
}
