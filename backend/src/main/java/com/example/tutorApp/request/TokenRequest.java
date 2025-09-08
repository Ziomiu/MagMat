package com.example.tutorApp.request;

import jakarta.validation.constraints.NotBlank;

public record TokenRequest(@NotBlank(message = "Reset token cannot be empty") String token) {
}
