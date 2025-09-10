package com.example.tutorApp.repository;

import com.example.tutorApp.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, UUID> {
}
