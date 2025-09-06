package com.example.tutorApp.service;

import com.example.tutorApp.errors.AccountNotVerifiedException;
import com.example.tutorApp.errors.EmailInUseException;
import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.WrongPasswordException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final VerificationService verificationService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, VerificationService verificationService) {
        this.userRepository = userRepository;
        this.verificationService = verificationService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<AppUser> getUsers() {
        return userRepository.findAll();
    }

    public AppUser login(LoginRequest loginRequest) {
        AppUser user = userRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new EmailNotFundException(loginRequest.email()));
        if (user == null) {
            throw new EmailNotFundException(loginRequest.email());
        }
        if (user.getUserRole() == UserRole.NOT_VERIFIED) {
            throw new AccountNotVerifiedException();
        }

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new WrongPasswordException();
        }
        return user;
    }

    public AppUser register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailInUseException(request.email());
        }
        String encodedPassword = passwordEncoder.encode(request.password());
        AppUser user = new AppUser(request.name(), request.surname(), request.email(), encodedPassword, UserRole.NOT_VERIFIED);
        AppUser savedUser = userRepository.save(user);

        verificationService.sendEmailVerificationToken(savedUser);
        return savedUser;
    }

    public void changePassword(String password, AppUser user) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
