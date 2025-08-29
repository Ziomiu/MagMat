package com.example.tutorApp.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "appUser_id")
    private AppUser appUser_id;

    private String response;

    private boolean graded = false;
    private boolean correct;

    @ManyToOne
    private QuizQuestion question;
}
