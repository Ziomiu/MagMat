package com.example.tutorApp.controller;

import com.example.tutorApp.request.TokenRequest;
import com.example.tutorApp.service.TokenService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
@CrossOrigin("*")
@Valid
public class TokenController {
    private final TokenService tokenService;
    private final Logger logger = LoggerFactory.getLogger(TokenController.class);

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
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
}
