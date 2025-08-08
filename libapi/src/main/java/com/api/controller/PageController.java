package com.api.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
// Enable React access
@CrossOrigin(origins = "http://localhost:5173") 
public class PageController {

     @RequestMapping("/home")
     @ResponseBody
    public String Home(){
        System.out.println("Home Page Handler");
        return "home";
    }
}