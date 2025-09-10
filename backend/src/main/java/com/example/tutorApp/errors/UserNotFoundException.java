package com.example.tutorApp.errors;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("User not found in system");
    }
}
