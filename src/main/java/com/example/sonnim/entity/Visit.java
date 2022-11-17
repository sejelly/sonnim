package com.example.sonnim.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(length=500, nullable = true)
    private String imgPath;
    @Column(length=50, nullable = true)
    private String gender;
    @Column(length=24, nullable = true)
    private Date visitedTime;
    @Column(nullable = true)
    private Boolean suspect;
    @Column(length=100, nullable = true)
    private Integer age;
}
