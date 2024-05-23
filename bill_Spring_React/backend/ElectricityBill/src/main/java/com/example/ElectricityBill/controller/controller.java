package com.example.ElectricityBill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ElectricityBill.service.ElectricityService;

@RestController
@RequestMapping("/electricity")
@CrossOrigin
public class controller {
	@Autowired
	ElectricityService electricityservice;
	
	@GetMapping("/calculate/{units}")
	public int calc(@PathVariable int units)
	{
		int bill = electricityservice.calculate(units);
		return bill;
	}
	
}
