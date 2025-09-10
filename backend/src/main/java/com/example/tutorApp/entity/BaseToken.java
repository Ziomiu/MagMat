package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    private LocalDateTime expiryDate;

    protected BaseToken() {
    }

    protected BaseToken(AppUser user) {
        this.user = user;
        this.token = generateTokenString();
        this.expiryDate = calculateExpiryDate();
    }

    protected String generateTokenString() {
        return UUID.randomUUID().toString();
    }

    protected LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusHours(24);
    }

    public UUID getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public AppUser getUser() {
        return user;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
}
