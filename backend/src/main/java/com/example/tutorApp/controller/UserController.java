package com.example.tutorApp.controller;

import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.dto.UserDTO;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import com.example.tutorApp.request.ForgotRequest;
import com.example.tutorApp.request.ResetRequest;
import com.example.tutorApp.service.UserService;
import com.example.tutorApp.service.TokenService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@Valid
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginRequest) {
        logger.debug("Attempting to log in user: {}", loginRequest);
        AppUser user = userService.loginUser(loginRequest);
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        logger.debug("Attempting to register user: {}", registerRequest);
        userService.registerUser(registerRequest);
        return ResponseEntity.ok("Account registered");
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<String> confirm(@RequestParam String token) {
        logger.debug("Attempting to confirm email with token: {}", token);
        tokenService.confirmEmailToken(token);
        return ResponseEntity.ok("Account verified");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotRequest forgotRequest) {
        logger.debug("Attempting to prepare password reset: {}", forgotRequest);
        tokenService.requestPasswordResetToken(forgotRequest.email());
        return ResponseEntity.ok("A reset email has been sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetRequest resetRequest) {
        logger.debug("Attempting to reset password: {}", resetRequest);
        AppUser user = tokenService.getResetTokenUser(resetRequest.token());
        userService.changePassword(resetRequest.password(), user);
        return ResponseEntity.ok("Password has been reset");
    }
}
