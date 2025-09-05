package com.example.tutorApp.service;


import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.TokenExpiredException;
import com.example.tutorApp.errors.TokenNotFoundException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.EmailVerificationToken;
import com.example.tutorApp.model.PasswordResetToken;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationService {
    @Value("${app.api-url}")
    private String apiBaseUrl;
    @Value("${app.app-url}")
    private String appBaseUrl;
    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final EmailService emailService;

    public VerificationService(UserRepository userRepository, VerificationRepository verificationRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
        this.emailService = emailService;
    }


    public void sendEmailVerificationToken(AppUser user) {
        String token = UUID.randomUUID().toString();
        EmailVerificationToken EmailVerificationToken = new EmailVerificationToken(token, user);
        verificationRepository.save(EmailVerificationToken);

        String link = apiBaseUrl + "/user/confirm?token=" + token;
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

    public void requestPasswordReset(String email) {
        AppUser user = userRepository.findByEmail(email).orElseThrow(() -> new EmailNotFundException(email));
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user);

        String link = appBaseUrl + "/reset-password?token=" + token;
        emailService.sendEmail(email, "Reste your password", "Click here: " + link);
    }

}
