package com.example.tutorApp.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "appuser_id")
    private AppUser appuser_id;

    private String response;

    private boolean graded = false;
    private boolean correct;

    @ManyToOne
    private QuizQuestion question;
}
