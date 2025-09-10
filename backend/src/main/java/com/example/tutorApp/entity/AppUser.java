package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String surname;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quiz> createdQuizzes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAnswer> answers;

    public AppUser() {
    }

    public AppUser(String name, String surname, String email, String password, UserRole userRole) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public UUID getId() {
        return id;
    }
}
