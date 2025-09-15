package com.example.tutorApp.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.tutorApp.dto.UserDTO;
import com.example.tutorApp.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {
    @Value("${JWT_KEY}")
    private String secret;

    private final UserRepository userRepository;

    public JwtUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostConstruct
    private void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + 3600 * 1000);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .withClaim("role", role)
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        return decodeToken(token).getSubject();
    }

    public String extractRole(String token) {
        return decodeToken(token).getClaim("role").asString();
    }

    public boolean validateToken(String token) {
        try {
            decodeToken(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    private DecodedJWT decodeToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm).build().verify(token);
    }

}
