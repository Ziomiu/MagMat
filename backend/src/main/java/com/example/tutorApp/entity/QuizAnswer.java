package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String text;
    private Boolean correct;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    public String getText() {
        return text;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public QuizQuestion getQuestion() {
        return question;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setQuestion(QuizQuestion question) {
        this.question = question;
    }
}
