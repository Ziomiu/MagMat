package com.example.tutorApp.dto;

import java.util.UUID;

public record StudentFeedbackAnswerDTO(
        UUID questionId,
        String questionText,
        String studentAnswerText,
        String correctAnswerText,
        Boolean correct,
        String teacherComment
) {
}
