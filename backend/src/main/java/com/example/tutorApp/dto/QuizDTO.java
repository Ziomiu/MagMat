package com.example.tutorApp.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class QuizDTO {
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<QuizQuestionDTO> questions;
    private UUID createdById;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public List<QuizQuestionDTO> getQuestions() {
        return questions;
    }

    public UUID getCreatedById() {
        return createdById;
    }
}
