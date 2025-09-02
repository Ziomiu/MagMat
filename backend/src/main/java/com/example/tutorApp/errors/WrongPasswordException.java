package com.example.tutorApp.errors;

public class WrongPasswordException extends RuntimeException {
    public WrongPasswordException() {
        super("Złe hasło");
    }
}
