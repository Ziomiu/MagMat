package com.example.tutorApp.dto.quiz;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record QuizDTO(UUID id,
                      String title,
                      String description,
                      LocalDateTime startDate,
                      LocalDateTime endDate,
                      List<QuizQuestionDTO> questions,
                      UUID createdById) {
}

