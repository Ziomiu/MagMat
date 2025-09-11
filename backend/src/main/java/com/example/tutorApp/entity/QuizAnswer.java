package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String text;
    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public QuizQuestion getQuestion() {
        return question;
    }

    public void setIsCorrect(Boolean correct) {
        this.isCorrect = correct;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setQuestion(QuizQuestion question) {
        this.question = question;
    }
}
