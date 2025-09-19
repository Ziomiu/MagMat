package com.example.tutorApp.repository;

import com.example.tutorApp.entity.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, UUID> {
}
