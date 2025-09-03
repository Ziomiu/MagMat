package com.example.tutorApp.errors;

public class EmailInUseException extends RuntimeException {
    public EmailInUseException(String email) {
        super("Podany email: " + email + " jest już w użytku.");
    }
}
