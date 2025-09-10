package com.example.tutorApp.entity;

import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class PasswordResetToken extends BaseToken {

    public PasswordResetToken() {
        super();
    }

    public PasswordResetToken(AppUser user) {
        super(user);
    }

    @Override
    protected LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusMinutes(30);
    }
}
