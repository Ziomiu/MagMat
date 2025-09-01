package com.example.tutorApp.service;

import com.example.tutorApp.model.AppUser;
import com.example.tutorApp.model.UserRole;
import com.example.tutorApp.repository.UserRepository;
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
}
