package com.example.tutorApp.dto.student;


import java.time.LocalDateTime;
import java.util.UUID;

public record AssignedQuizDTO(
        UUID id,
        String title,
        String description,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Boolean completed) {
}
