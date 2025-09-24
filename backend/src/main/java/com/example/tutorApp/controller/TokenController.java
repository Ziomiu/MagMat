package com.example.tutorApp.controller;

import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.request.TokenRequest;
import com.example.tutorApp.response.LoginResponse;
import com.example.tutorApp.service.TokenService;
import com.example.tutorApp.service.UserService;
import com.example.tutorApp.utils.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/token")
@CrossOrigin("*")
@Valid
public class TokenController {
    private final TokenService tokenService;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(TokenController.class);

    public TokenController(TokenService tokenService, JwtUtil jwtUtil, UserService userService) {
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/verify-reset")
    public void verifyResetToken(@RequestBody TokenRequest tokenRequest) {
        tokenService.verifyResetToken(tokenRequest.token());
    }
    @GetMapping("/confirm-email")
    public ResponseEntity<String> confirm(@RequestParam String token) {
        logger.debug("Attempting to confirm email with token: {}", token);
        tokenService.confirmEmailToken(token);
        return ResponseEntity.ok("Account verified");
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtUtil.extractUserId(refreshToken);
        AppUser user = userService.findUserById(UUID.fromString(username));
        String accessToken = jwtUtil.generateAccessToken(user.getId().toString(), user.getUserRole().name());
        LoginResponse loginResponse = new LoginResponse(accessToken);
        return ResponseEntity.ok(loginResponse);
    }
}
