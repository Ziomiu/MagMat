package com.example.tutorApp.errors;

public class AssignmentNotFoundException extends RuntimeException {
    public AssignmentNotFoundException() {
        super("Assignment not found in system");
    }
}
