package com.example.tutorApp.repository;

import com.example.tutorApp.entity.QuizAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuizAssignmentRepository extends JpaRepository<QuizAssignment, UUID> {
    List<QuizAssignment> findByStudentId(UUID studentId);

    Optional<QuizAssignment> findByStudentIdAndQuizId(UUID studentId, UUID quizId);
}