package com.example.tutorApp.dto.student;

import java.util.UUID;

public record StudentAnswerFeedbackDTO(
        UUID questionId,
        String questionText,
        String studentAnswerText,
        String correctAnswerText,
        String answerStatus,
        String teacherComment
) {
}
