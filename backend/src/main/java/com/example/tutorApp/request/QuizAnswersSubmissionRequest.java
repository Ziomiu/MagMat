package com.example.tutorApp.request;

import com.example.tutorApp.dto.student.SubmittedAnswerDTO;

import java.util.List;
import java.util.UUID;

public record QuizAnswersSubmissionRequest(UUID studentId,
                                           List<SubmittedAnswerDTO> answers) {
}
