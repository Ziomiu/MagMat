package com.example.tutorApp.errors;

public class QuizNotFound extends RuntimeException {
    public QuizNotFound() {
        super("Quiz not found");
    }
}
