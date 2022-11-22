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
@RequestMapping("/visit")
public class VisitController {

    private final VisitRepository visitRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("update")
    public String updateMember(@RequestParam(value = "id") Integer id, @RequestParam(value = "suspect") Boolean suspect) {
        if(visitRepository.findById(id).isEmpty()) { // 값 존재여부 확인
            return "입력한 " + id + "이 존재하지 않습니다";
        } else {
            visitRepository.save(Visit.builder().id(id).suspect(suspect).build());
            return id + "의 주의 요망 여부를 변경 완료";
        }
    }

    @GetMapping("delete")
    public String deleteMember(@RequestParam(value = "id") Integer id) {
        if(visitRepository.findById(id).isEmpty()) { // 값 존재여부 확인
            return "입력한 " + id + "이 존재하지 않습니다";
        } else {
            visitRepository.delete(Visit.builder().id(id).build());
            return id + " 삭제 완료";
        }
    }

    @GetMapping(value="insert")
    public String insertMember(@RequestParam(value = "img_path") String img_path, @RequestParam(value = "suspect") Boolean suspect, @RequestParam(value="age") Integer age, @RequestParam(value="gender") String gender) {//Integer과 int 비교

         {
            Visit visit = Visit.builder().imgPath(img_path).suspect(suspect).age(age).gender(gender).build();
            visitRepository.save(visit);
            return "이미지: " +img_path+ " suspect : " + suspect + "으로 추가 되었습니다";
        }
    }

    @GetMapping("search")
    public String searchAllMember() {
        return visitRepository.findAll().toString();
    }

    @GetMapping("searchParam")
    public String searchParamMember() {
        List resultList = entityManager.createQuery("select v.imgPath from Visit v where v.suspect = :trueSuspect")
                .setParameter("trueSuspect", true)
                .getResultList();
        return resultList.toString();
    }
//
//    @GetMapping("searchImg")
//    public String searchImg() {
//        return visitRepository.findBySuspect(true).toString();
//    }


    @GetMapping("searchParamRepo")
    public String searchParamRepoMember(@RequestParam(value = "id") Integer id) {
        return visitRepository.searchParamRepo(id).toString();
    }

}