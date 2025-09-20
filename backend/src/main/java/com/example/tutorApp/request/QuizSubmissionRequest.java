package com.example.tutorApp.request;

import com.example.tutorApp.dto.SubmittedAnswerDTO;

import java.util.List;
import java.util.UUID;

public record QuizSubmissionRequest(UUID quizId, UUID studentId,
                                    List<SubmittedAnswerDTO> answers) {
}
