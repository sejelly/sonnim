package com.example.sonnim.repository;

import com.example.sonnim.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    @Query(value = "select id, img_path from visit where id = :id", nativeQuery=true)
    List<Visit> searchParamRepo(@Param("id") Integer id);

}
