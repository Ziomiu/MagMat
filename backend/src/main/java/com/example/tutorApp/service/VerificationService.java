package com.example.tutorApp.service;


import com.example.tutorApp.errors.TokenExpiredException;
import com.example.tutorApp.errors.TokenNotFoundException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.EmailVerificationToken;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationService {
    @Value("${app.base-url}")
    private String baseUrl;
    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final EmailService emailService;

    public VerificationService(UserRepository userRepository, VerificationRepository verificationRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
        this.emailService = emailService;
    }

    @Async
    public void sendEmailVerificationToken(AppUser user) {
        String token = UUID.randomUUID().toString();
        EmailVerificationToken EmailVerificationToken = new EmailVerificationToken(token, user);
        verificationRepository.save(EmailVerificationToken);

        String link = baseUrl + "/user/confirm?token=" + token;
        emailService.sendEmail(user.getEmail(), "Confirm your account", "Click here: " + link);
    }

    public void confirmToken(String token) {
        EmailVerificationToken EmailVerificationToken = verificationRepository.findByToken(token)
                .orElseThrow(TokenNotFoundException::new);
        if (EmailVerificationToken.getUser().getUserRole() == UserRole.NOT_VERIFIED) {
            if (EmailVerificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
                throw new TokenExpiredException(EmailVerificationToken.getExpiryDate());
            }

            AppUser user = EmailVerificationToken.getUser();
            user.setUserRole(UserRole.STUDENT);
            userRepository.save(user);
        }
    }

}
