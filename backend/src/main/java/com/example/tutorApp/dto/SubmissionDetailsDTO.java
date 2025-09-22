package com.example.tutorApp.dto;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record SubmissionDetailsDTO(UUID submissionId, UUID quizId, UUID studentId,
                                  String name,String surname,
                                  LocalDateTime submittedAt, List<StudentAnswerDTO> answers) {}
