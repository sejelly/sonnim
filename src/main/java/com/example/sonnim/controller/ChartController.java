package com.example.sonnim.controller;

import com.example.sonnim.entity.Visit;
import com.example.sonnim.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/chart")
public class ChartController {

    private final VisitRepository visitRepository;

    @PersistenceContext
    private EntityManager entityManager;


    @GetMapping("search")
    public String searchAllMember() {
        return visitRepository.findAll().toString();
    }
    @GetMapping("searchParamAge")
    public int searchParamAge(@RequestParam(value = "age") Integer age) {
        List resultList = entityManager.createQuery("select v from Visit v where v.age = :trueAge")
                .setParameter("trueAge", age)
                .getResultList();
        return resultList.size();
    }

    @GetMapping("searchParamGender")
    public int searchParamGender(@RequestParam(value = "gender") String gender) {
        List resultList = entityManager.createQuery("select v from Visit v where v.gender = :trueGender")
                .setParameter("trueGender", gender)
                .getResultList();
        return resultList.size();
    }


    @GetMapping("searchParamVisitedTime")
    public int searchParamVisitedTime(@RequestParam(value = "visited_time") Integer visitedTime) {
        List resultList = entityManager.createQuery("select v from Visit v where v.visitedTime = :trueVisitedTime")
                .setParameter("trueVisitedTime", visitedTime)
                .getResultList();
        return resultList.size();
    }
//    @GetMapping("searchParamAge")
//    public String searchParamAge(@RequestParam(value = "age") Integer age) {
//        List resultList = entityManager.createQuery("select v from Visit v where v.age = :trueAge")
//                .setParameter("trueAge", age)
//                .getResultList();
//        return resultList.toString();
//    }
//
//    @GetMapping("searchParamGender")
//    public String searchParamGender(@RequestParam(value = "gender") String gender) {
//        List resultList = entityManager.createQuery("select v from Visit v where v.gender = :trueGender")
//                .setParameter("trueGender", gender)
//                .getResultList();
//        return resultList.toString();
//    }
//
//
//    @GetMapping("searchParamVisitedTime")
//    public String searchParamVisitedTime(@RequestParam(value = "visited_time") Integer visitedTime) {
//        List resultList = entityManager.createQuery("select v from Visit v where v.visitedTime = :trueVisitedTime")
//                .setParameter("trueVisitedTime", visitedTime)
//                .getResultList();
//        return resultList.toString();
//    }
//    @GetMapping("searchParamRepo")
//    public String searchParamRepoMember(@RequestParam(value = "id") Integer id) {
//        return visitRepository.searchParamRepo(id).toString();
//    }

}