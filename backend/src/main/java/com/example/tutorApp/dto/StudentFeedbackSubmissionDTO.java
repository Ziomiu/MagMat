package com.example.tutorApp.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record StudentFeedbackSubmissionDTO(
        UUID submissionId,
        UUID quizId,
        String quizTitle,
        List<StudentFeedbackAnswerDTO> answers
) {
}
