package com.example.tutorApp.model;

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
