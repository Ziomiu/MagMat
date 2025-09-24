package com.example.tutorApp.request;


import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(@NotBlank(message = "Reset token cannot be empty") String token,
                                   @NotBlank(message = "Password cannot be empty") String password) {
}
