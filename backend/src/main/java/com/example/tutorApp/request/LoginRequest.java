package com.example.tutorApp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@Email(message = "Invalid email format")
                           @NotBlank(message = "Email cannot be empty")
                           String email,
                           @NotBlank(message = "Password cannot be empty")
                           String password) {
}
