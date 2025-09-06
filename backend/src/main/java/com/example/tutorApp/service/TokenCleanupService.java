package com.example.tutorApp.service;

import com.example.tutorApp.model.EmailVerificationToken;
import com.example.tutorApp.model.PasswordResetToken;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.EmailVerificationTokenRepository;
import com.example.tutorApp.repository.PasswordResetTokenRepository;
import com.example.tutorApp.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TokenCleanupService {

    private final EmailVerificationTokenRepository emailTokenRepo;
    private final PasswordResetTokenRepository resetTokenRepo;
    private final UserRepository userRepo;

    public TokenCleanupService(EmailVerificationTokenRepository emailVerificationTokenRepository,
                               PasswordResetTokenRepository passwordResetTokenRepository,
                               UserRepository userRepository) {
        this.emailTokenRepo = emailVerificationTokenRepository;
        this.resetTokenRepo = passwordResetTokenRepository;
        this.userRepo = userRepository;
    }

    @Scheduled(cron = "0 0 * * * *")
    public void cleanUpExpiredTokens() {
        cleanUpPasswordResetTokens();
        cleanUpEmailVerificationTokens();
    }

    private void cleanUpPasswordResetTokens() {
        List<PasswordResetToken> tokens = resetTokenRepo.findAll();
        tokens.stream()
                .filter(PasswordResetToken::isExpired)
                .forEach(resetTokenRepo::delete);
    }

    private void cleanUpEmailVerificationTokens() {
        List<EmailVerificationToken> tokens = emailTokenRepo.findAll();
        tokens.stream()
                .filter(EmailVerificationToken::isExpired)
                .forEach(token -> {
                    if (token.getUser().getUserRole() == UserRole.NOT_VERIFIED) {
                        userRepo.delete(token.getUser());
                    }
                    emailTokenRepo.delete(token);
                });
    }
}
