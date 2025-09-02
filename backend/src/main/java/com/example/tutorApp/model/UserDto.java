package com.example.tutorApp.model;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private UserRole role;

    public UserDto(AppUser user) {
        this.id = user.getId();
        this.role = user.getUserRole();
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
