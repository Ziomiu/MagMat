package com.example.tutorApp.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.key}")
    private String secret;
    private final long ACCESS_EXPIRATION = 15 * 60 * 1000; // 15 min
    private final long REFRESH_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days

    @PostConstruct
    private void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String generateAccessToken(String userId, String role) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + ACCESS_EXPIRATION);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(userId)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .withClaim("role", role)
                .sign(algorithm);
    }

    public String generateRefreshToken(String userId) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + REFRESH_EXPIRATION);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(userId)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .sign(algorithm);
    }

    public String extractUserId(String token) {
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
