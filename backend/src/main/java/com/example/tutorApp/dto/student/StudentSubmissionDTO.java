package com.example.tutorApp.dto.student;

import java.util.UUID;

public record StudentSubmissionDTO(
        UUID submissionId,
        UUID quizId,
        String quizTitle,
        Boolean graded
) {}
