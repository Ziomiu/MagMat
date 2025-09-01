package com.example.tutorApp.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class QuizQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String text;

    @Enumerated(EnumType.STRING)
    private QuestionType type;
    @ElementCollection
    private List<String> options;
    @ElementCollection
    private List<String> correctAnswers;

    @ManyToOne
    private Quiz quiz;
}
