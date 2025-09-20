package com.example.tutorApp.dto;

import java.util.UUID;

public record AnswerGradeDTO(UUID studentAnswerId, Boolean correct, String comment) {}

