package com.example.tutorApp.dto;

import java.util.List;
import java.util.UUID;

public record QuizQuestionDTO(UUID id,
                              String text,
                              String type,
                              List<QuizAnswerDTO> answers) {

}
