package com.example.sonnim.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home(){
        System.out.println("Home");
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
    @RequestMapping(value="/getDir",method = {RequestMethod.POST})
    @ResponseBody
    public List<String> getDir(Model model){
        List<String> ret=new ArrayList<String>();
        String data_dir = "C:\\capture\\";
        File dir = new File(data_dir);
        for (String filename:dir.list()){
            ret.add(filename);
        }
        return ret;
    }
}
