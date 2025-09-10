package com.example.tutorApp.dto;

public class QuizAnswerDTO {
    private String text;
    private boolean correct;

    public boolean isCorrect() {
        return correct;
    }

    public String getText() {
        return text;
    }
}
