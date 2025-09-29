package com.example.tutorApp.errors;

public class QuizAlreadyCompletedException extends RuntimeException {
    public QuizAlreadyCompletedException() {
        super("You have already completed this quiz");
    }
}
