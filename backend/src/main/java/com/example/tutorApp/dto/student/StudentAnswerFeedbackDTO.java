package com.example.tutorApp.dto.student;

import java.util.List;
import java.util.UUID;

public record StudentAnswerFeedbackDTO(
        UUID questionId,
        String questionText,
        List<String> studentAnswerText,
        List<String> correctAnswerText,
        String answerStatus,
        String teacherComment
) {
}
