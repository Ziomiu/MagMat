package com.example.tutorApp.dto.student;

import java.util.UUID;

public record SubmittedAnswerDTO(UUID questionId,
                                 UUID answerId,
                                 String textAnswer) {
}
