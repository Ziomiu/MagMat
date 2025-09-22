package com.example.tutorApp.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record StudentSubmissionDTO(
        UUID submissionId,
        UUID quizId,
        String quizTitle,
        Boolean graded
) {}
