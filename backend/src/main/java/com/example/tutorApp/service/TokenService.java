package com.example.tutorApp.service;


import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.TokenExpiredException;
import com.example.tutorApp.errors.TokenNotFoundException;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.EmailVerificationToken;
import com.example.tutorApp.entity.PasswordResetToken;
import com.example.tutorApp.entity.UserRole;
import com.example.tutorApp.repository.PasswordResetTokenRepository;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TokenService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    @Value("${app.api-url}")
    private String apiBaseUrl;
    @Value("${app.app-url}")
    private String appBaseUrl;
    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final EmailService emailService;

    public TokenService(UserRepository userRepository, VerificationRepository verificationRepository, EmailService emailService, PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
        this.emailService = emailService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }


    public void sendEmailVerificationToken(AppUser user) {
        EmailVerificationToken emailVerificationToken = new EmailVerificationToken(user);
        verificationRepository.save(emailVerificationToken);

        String link = apiBaseUrl + "/user/confirm-email?token=" + emailVerificationToken.getToken();
        emailService.sendEmail(user.getEmail(), "Confirm your account", "Click here: " + link);
    }

    public void confirmEmailToken(String token) {
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

    public void requestPasswordResetToken(String email) {
        AppUser user = userRepository.findByEmail(email).orElseThrow(() -> new EmailNotFundException(email));
        PasswordResetToken passwordResetToken = new PasswordResetToken(user);
        passwordResetTokenRepository.save(passwordResetToken);
        String link = appBaseUrl + "/reset-password?token=" + passwordResetToken.getToken();
        emailService.sendEmail(email, "Reset your password", "Click here: " + link);
    }

    public AppUser getResetTokenUser(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(TokenNotFoundException::new);
        if (passwordResetToken.isExpired()) {
            throw new TokenExpiredException(passwordResetToken.getExpiryDate());
        }
        return passwordResetToken.getUser();
    }

    public void verifyResetToken(String token) {
        PasswordResetToken passwordResetToken =
                passwordResetTokenRepository.findByToken(token).orElseThrow(TokenNotFoundException::new);
    }
}
