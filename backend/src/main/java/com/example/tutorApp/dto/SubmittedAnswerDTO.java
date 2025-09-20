package com.example.tutorApp.dto;

import java.util.UUID;

public record SubmittedAnswerDTO(UUID questionId, UUID answerId, String textAnswer) {
}
