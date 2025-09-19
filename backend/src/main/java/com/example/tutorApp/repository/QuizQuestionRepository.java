package com.example.tutorApp.repository;

import com.example.tutorApp.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, UUID> {
}
