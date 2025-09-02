package com.example.tutorApp.controller;

import com.example.tutorApp.errors.AccountNotVerifiedException;
import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.WrongPasswordException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserDto;
import com.example.tutorApp.request.LoginRequest;
import com.example.tutorApp.service.UserService;
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
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping
    public ResponseEntity<AppUser> addUser(@RequestParam String name, String email, String password) {
        return ResponseEntity.ok(userService.addUser(name, email, password));
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
}
