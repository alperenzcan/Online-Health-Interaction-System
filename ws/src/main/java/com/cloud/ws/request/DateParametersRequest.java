package com.cloud.ws.request;

import java.util.Date;

import lombok.Data;

@Data
public class DateParametersRequest {

	private Date max;
	private Date min;
}
