package com.example.tutorApp.dto.user;

import java.util.UUID;

public record UserDetailsDTO(UUID id,
                             String name,
                             String surname,
                             String email,
                             String userRole) {
}
