package com.example.tutorApp.service;

import com.example.tutorApp.errors.AccountNotVerifiedException;
import com.example.tutorApp.errors.EmailNotFundException;
import com.example.tutorApp.errors.WrongPasswordException;
import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.request.LoginRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AppUser> getUsers() {
        return userRepository.findAll();
    }

    public AppUser addUser(String name, String email, String password) {
        AppUser appUser = new AppUser(name, email, password, UserRole.STUDENT);
        return userRepository.save(appUser);
    }

    public AppUser login(LoginRequest loginRequest) {
        AppUser user = userRepository.findByEmail(loginRequest.email());
        if (user == null) {
            throw new EmailNotFundException(loginRequest.email());
        }
        if (user.getUserRole() == UserRole.NOT_VERIFIED) {
            throw new AccountNotVerifiedException();
        }

        if (!loginRequest.password().equals(user.getPassword())) {
            throw new WrongPasswordException();
        }
        return user;
    }
}
