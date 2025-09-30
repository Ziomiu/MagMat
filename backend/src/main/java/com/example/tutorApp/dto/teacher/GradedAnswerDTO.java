package com.example.tutorApp.dto.teacher;

import java.util.UUID;
public record GradedAnswerDTO(UUID studentAnswerId,
                              String answerStatus,
                              String comment) {
}

