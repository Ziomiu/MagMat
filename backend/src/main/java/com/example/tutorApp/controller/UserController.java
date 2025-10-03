package com.example.tutorApp.controller;

import com.example.tutorApp.dto.user.UserDetailsDTO;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.UserRole;
import com.example.tutorApp.request.ForgotPasswordRequest;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.request.RegisterRequest;
import com.example.tutorApp.request.ResetPasswordRequest;
import com.example.tutorApp.response.LoginResponse;
import com.example.tutorApp.response.StudentResponse;
import com.example.tutorApp.service.TokenService;
import com.example.tutorApp.service.UserService;
import com.example.tutorApp.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@Valid
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final JwtUtil jwtUtil;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService, TokenService tokenService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<UserDetailsDTO>> getUserDetails() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest,
                                               HttpServletResponse response) {
        AppUser user = userService.loginUser(loginRequest);
        String accessToken = jwtUtil.generateAccessToken(user.getId().toString(), user.getUserRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId().toString());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("None")
                .domain("magmat-n7bg.onrender.com")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new LoginResponse(accessToken));
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        logger.debug("Attempting to register user: {}", registerRequest);
        userService.registerUser(registerRequest);
        return ResponseEntity.ok("Account registered");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        logger.debug("Attempting to prepare password reset: {}", forgotPasswordRequest);
        tokenService.sendPasswordResetToken(forgotPasswordRequest.email());
        return ResponseEntity.ok("A reset email has been sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        logger.debug("Attempting to reset password: {}", resetPasswordRequest);
        AppUser user = tokenService.getResetTokenUser(resetPasswordRequest.token());
        userService.changeUserPassword(resetPasswordRequest.password(), user);
        return ResponseEntity.ok("Password has been reset");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .domain("magmat-n7bg.onrender.com")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.ok().build();
    }


    @GetMapping("/me/{userId}")
    public ResponseEntity<StudentResponse> getCurrentUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable UUID id,
                                                 @RequestParam UserRole role) {
        userService.updateUserRole(id, role);
        return ResponseEntity.ok("");
    }
}
