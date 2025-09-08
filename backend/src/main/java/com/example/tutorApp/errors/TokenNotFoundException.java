package com.example.tutorApp.errors;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Token not found in system.");
    }
}
