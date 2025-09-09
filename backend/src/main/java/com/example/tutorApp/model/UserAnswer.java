package com.example.tutorApp.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = true)
    private QuizAnswer selectedAnswer;

    private String textResponse;
}
