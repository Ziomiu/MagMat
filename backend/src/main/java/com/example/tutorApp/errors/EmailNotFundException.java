package com.example.tutorApp.errors;

public class EmailNotFundException extends RuntimeException {
    public EmailNotFundException(String email) {
        super("Podany email: " + email + " nie został znaleziony.");
    }
}
