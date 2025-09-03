package com.example.tutorApp.errors;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Nie znaleziono podanego tokenu.");
    }
}
