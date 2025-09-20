package com.example.tutorApp.dto;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record SubmissionDetailsDTO(UUID submissionId, UUID quizId, UUID studentId,
                                  String studentName,
                                  LocalDateTime submittedAt, List<StudentAnswerDTO> answers) {}
