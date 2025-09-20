package com.example.tutorApp.dto;

import java.util.UUID;

public record StudentAnswerDTO(UUID id, UUID questionId, String questionText,
                               UUID selectedAnswerId, String selectedAnswerText,
                               String textAnswer, Boolean correct, String comment) {}
