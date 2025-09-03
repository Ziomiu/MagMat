package com.example.tutorApp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class EmailVerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String token;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    private LocalDateTime expiryDate;

    public EmailVerificationToken() {

    }

    public EmailVerificationToken(String token, AppUser user) {
        this.token = token;
        this.user = user;
        this.expiryDate = calculateExpiryDate();
    }

    private LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusHours(24);
    }


    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public AppUser getUser() {
        return user;
    }
}