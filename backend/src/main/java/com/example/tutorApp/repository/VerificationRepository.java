package com.example.tutorApp.repository;


import com.example.tutorApp.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VerificationRepository extends JpaRepository<EmailVerificationToken, UUID> {
    Optional<EmailVerificationToken> findByToken(String token);

    List<EmailVerificationToken> findAllByExpiryDateBefore(LocalDateTime now);
}
