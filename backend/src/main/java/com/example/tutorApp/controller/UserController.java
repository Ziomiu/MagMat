package com.example.tutorApp.controller;

import com.example.tutorApp.errors.*;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserDto;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import com.example.tutorApp.request.ForgotRequest;
import com.example.tutorApp.request.ResetRequest;
import com.example.tutorApp.service.UserService;
import com.example.tutorApp.service.VerificationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final VerificationService verificationService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService, VerificationService verificationService) {
        this.userService = userService;
        this.verificationService = verificationService;
    }

    @GetMapping
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            AppUser user = userService.login(loginRequest);
            return ResponseEntity.ok(new UserDto(user));
        } catch (AccountNotVerifiedException | WrongPasswordException | EmailNotFundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            userService.register(request);
            return ResponseEntity.ok("");
        } catch (EmailInUseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestParam String token) {
        try {
            verificationService.confirmToken(token);
        } catch (TokenExpiredException | TokenNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Account verified");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            String email = request.email();
            verificationService.requestPasswordReset(email);
        } catch (EmailNotFundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("A reset email has been sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            String token = request.token();
            AppUser user = verificationService.getResetTokenUser(token);
            userService.changePassword(request.password(), user);
        } catch (EmailNotFundException | TokenExpiredException | TokenNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Password has been reset");
    }
}
