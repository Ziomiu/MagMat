package com.example.tutorApp.errors;

public class SameAsOldPasswordException extends RuntimeException {
    public SameAsOldPasswordException() {
        super("Password is the same as old password");
    }
}
