package com.example.tutorApp.errors;

public class AccountNotVerifiedException extends RuntimeException {
    public AccountNotVerifiedException() {
        super("Your account is not verified. Check your email to verify your account.");
    }
}
