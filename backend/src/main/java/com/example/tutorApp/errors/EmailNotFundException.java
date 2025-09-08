package com.example.tutorApp.errors;

public class EmailNotFundException extends RuntimeException {
    public EmailNotFundException(String email) {
        super("Email: " + email + " has not benn found in system.");
    }
}
