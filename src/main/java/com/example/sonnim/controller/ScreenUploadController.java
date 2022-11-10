package com.example.sonnim.controller;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.UUID;

import static org.hibernate.bytecode.enhance.spi.interceptor.BytecodeInterceptorLogging.LOGGER;

@Controller
public class ScreenUploadController {
    @ResponseBody
    @RequestMapping(value = "/ImgSaveTest.do" , method = RequestMethod.POST)
    public ModelMap ImgSaveTest(@RequestParam HashMap<Object, Object> param, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        ModelMap map = new ModelMap();
        String binaryData = request.getParameter("imgSrc");
        FileOutputStream stream = null;
        try{
            System.out.println("binary file   "  + binaryData);
            if(binaryData == null || binaryData.trim().equals("")) {
                throw new Exception();
            }
            binaryData = binaryData.replaceAll("data:image/jpg;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);
            String fileName=  request.getParameter("fileName");
            stream = new FileOutputStream("/Users/gimjunseo/Downloads/"+fileName+".jpg");
            stream.write(file);
            stream.close();
            System.out.println("캡처 저장");

        }catch(Exception e){
            e.printStackTrace();
            System.out.println("에러 발생");
        }finally{
            if(stream != null) {
                stream.close();
            }
        }

        map.addAttribute("resultMap", "");
        return map;
    }
}
