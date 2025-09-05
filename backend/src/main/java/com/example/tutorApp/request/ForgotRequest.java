package com.example.tutorApp.request;

import jakarta.validation.constraints.Email;

public record ForgotRequest(@Email(message = "Invalid email format") String email) {
}
