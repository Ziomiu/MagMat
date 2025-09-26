package com.example.tutorApp.dto.teacher;

import java.util.UUID;

public record SubmittedStudentAnswerDTO(UUID id,
                                        UUID questionId,
                                        String questionText,
                                        UUID selectedAnswerId,
                                        String selectedAnswerText,
                                        String textAnswer,
                                        String answerStatus,
                                        String comment) {}
