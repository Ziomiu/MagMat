package com.example.tutorApp.dto;

import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.UserRole;

import java.util.UUID;

public record UserDTO(UUID id,
                      UserRole role) {


    public UserDTO(AppUser user) {
        this(user.getId(), user.getUserRole());
    }

}
