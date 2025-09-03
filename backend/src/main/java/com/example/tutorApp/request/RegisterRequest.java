package com.example.tutorApp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(@NotBlank(message = "Name cannot be empty")
                              String name,
                              @NotBlank(message = "Surname cannot be empty")
                              String surname,
                              @Email(message = "Invalid email format")
                              @NotBlank(message = "Email cannot be empty")
                              String email,
                              @NotBlank(message = "Password cannot be empty")
                              String password) {
}

