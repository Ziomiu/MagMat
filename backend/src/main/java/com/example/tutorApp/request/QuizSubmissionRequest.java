package com.example.tutorApp.request;

import java.util.List;
import java.util.UUID;

public record QuizSubmissionRequest(UUID quizId, UUID studentId,
                                    List<SubmittedAnswerRequest> answers) {
}
