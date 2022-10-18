package com.example.sonnim.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(length=500, nullable = true)
    private String imgPath;
    @Column(length=50, nullable = true)
    private String gender;
    @Column(length=24, nullable = true)
    private Integer visitedTime;
    @Column(nullable = true)
    private Boolean suspect;
    @Column(length=100, nullable = true)
    private Integer age;
}
