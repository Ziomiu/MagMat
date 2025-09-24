package com.example.tutorApp.dto.teacher;

import java.util.UUID;
public record GradedAnswerDTO(UUID studentAnswerId,
                              Boolean correct,
                              String comment) {
}

