package com.example.tutorApp.dto;

import java.util.UUID;

public record QuizAnswerDTO(UUID id,
                            String text,
                            boolean correct) {

}
