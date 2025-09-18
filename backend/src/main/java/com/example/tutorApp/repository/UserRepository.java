package com.example.tutorApp.repository;

import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {
    Optional<AppUser> findByEmail(String email);

    List<AppUser> findByUserRoleEquals(UserRole userRole);
}
