package com.example.tutorApp.errors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            AccountNotVerifiedException.class,
            WrongPasswordException.class,
            EmailNotFundException.class,
            EmailInUseException.class,
            TokenExpiredException.class,
            TokenNotFoundException.class,
            SameAsOldPasswordException.class,
            UserNotFoundException.class,
            AssignmentNotFoundException.class,
    })
    public ResponseEntity<String> handleCustomExceptions(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationErrors(MethodArgumentNotValidException ex) {
        StringBuilder errorMessage = new StringBuilder("Validation failed: ");
        ex.getBindingResult().getFieldErrors().forEach(err ->
                errorMessage.append(err.getField())
                        .append(" - ")
                        .append(err.getDefaultMessage())
                        .append("; ")
        );
        return ResponseEntity.unprocessableEntity().body(errorMessage.toString().trim());
    }
}