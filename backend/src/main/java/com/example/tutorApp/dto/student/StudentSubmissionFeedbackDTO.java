package com.example.tutorApp.dto.student;

import java.util.List;
import java.util.UUID;

public record StudentSubmissionFeedbackDTO(
        UUID submissionId,
        UUID quizId,
        String quizTitle,
        List<StudentAnswerFeedbackDTO> answers
) {
}
