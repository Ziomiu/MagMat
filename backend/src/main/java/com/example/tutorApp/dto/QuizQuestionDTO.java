package com.example.tutorApp.dto;

import java.util.List;

public class QuizQuestionDTO {
    private String text;
    private String type;
    private List<QuizAnswerDTO> answers;

    public String getText() {
        return text;
    }

    public String getType() {
        return type;
    }

    public List<QuizAnswerDTO> getAnswers() {
        return answers;
    }
}
