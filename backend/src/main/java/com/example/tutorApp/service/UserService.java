package com.example.tutorApp.service;

import com.example.tutorApp.errors.AccountNotVerifiedException;
import com.example.tutorApp.errors.EmailInUseException;
import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.WrongPasswordException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.repository.VerificationRepository;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final VerificationService verificationService;

    public UserService(UserRepository userRepository, VerificationService verificationService) {
        this.userRepository = userRepository;
        this.verificationService = verificationService;
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

        if (!loginRequest.password().equals(user.getPassword())) {
            throw new WrongPasswordException();
        }
        return user;
    }

    public AppUser register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailInUseException(request.email());
        }
        AppUser user = new AppUser(request.name(), request.surname(), request.email(), request.password(), UserRole.NOT_VERIFIED);
        AppUser savedUser = userRepository.save(user);

        verificationService.sendEmailVerificationToken(savedUser);
        return savedUser;
    }
}
