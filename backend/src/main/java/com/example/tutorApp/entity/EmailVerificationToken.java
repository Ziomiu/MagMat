package com.example.tutorApp.entity;

import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class EmailVerificationToken extends BaseToken {

    public EmailVerificationToken() {
        super();
    }

    public EmailVerificationToken(AppUser user) {
        super(user);
    }

    @Override
    protected LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusHours(1);
    }
}
