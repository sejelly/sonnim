package com.example.sonnim.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home(){
        return "index";
    }
    @GetMapping("/face")
    public String face(){
        return "face";
    }
    @GetMapping("/personal")
    public String personal(){
        return "personal";
    }
}
