package com.example.tutorApp.errors;

import java.time.LocalDateTime;

public class TokenExpiredException extends RuntimeException {
    public TokenExpiredException(LocalDateTime dateTime) {
        super("Token has expired at: " + dateTime);
    }
}
