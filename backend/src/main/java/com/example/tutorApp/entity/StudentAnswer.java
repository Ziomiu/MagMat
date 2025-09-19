package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class StudentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private QuizAssignment assignment;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private QuizQuestion question;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private QuizAnswer answer;

    private String textAnswer;

    public UUID getId() {
        return id;
    }

    public QuizAssignment getAssignment() {
        return assignment;
    }

    public QuizQuestion getQuestion() {
        return question;
    }

    public QuizAnswer getAnswer() {
        return answer;
    }

    public String getTextAnswer() {
        return textAnswer;
    }

    public void setAssignment(QuizAssignment assignment) {
        this.assignment = assignment;
    }

    public void setQuestion(QuizQuestion question) {
        this.question = question;
    }

    public void setAnswer(QuizAnswer answer) {
        this.answer = answer;
    }

    public void setTextAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
    }
}
