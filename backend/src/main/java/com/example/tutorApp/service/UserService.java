package com.example.tutorApp.service;

import com.example.tutorApp.dto.user.UserDetailsDTO;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.UserRole;
import com.example.tutorApp.errors.*;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import com.example.tutorApp.response.StudentResponse;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AppUser loginUser(LoginRequest loginRequest) {
        AppUser user = userRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new EmailNotFundException(loginRequest.email()));
        if (user.getUserRole() == UserRole.NOT_VERIFIED) {
            throw new AccountNotVerifiedException();
        }
        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new WrongPasswordException();
        }
        return user;
    }

    public void registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailInUseException(request.email());
        }
        String encodedPassword = passwordEncoder.encode(request.password());
        AppUser user = new AppUser(request.name(), request.surname(), request.email(), encodedPassword, UserRole.NOT_VERIFIED);
        AppUser savedUser = userRepository.save(user);

//        tokenService.sendEmailVerificationToken(savedUser);
    }

    public void changeUserPassword(String password, AppUser user) {
        if (passwordEncoder.matches(password, user.getPassword())) {
            throw new SameAsOldPasswordException();
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public AppUser findUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public StudentResponse getUserInfo(UUID id) {
        AppUser user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return new StudentResponse(user.getId(), user.getName(), user.getSurname());
    }

    @Transactional
    public void updateUserRole(UUID id, UserRole role) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setUserRole(role);
        userRepository.save(user);
    }

    public List<UserDetailsDTO> getAllUsers() {
        return userRepository.findAll().stream().map(u -> {
            return new UserDetailsDTO(
                    u.getId(),
                    u.getName(),
                    u.getSurname(),
                    u.getEmail(),
                    u.getUserRole().name()
            );
        }).toList();
    }

}
