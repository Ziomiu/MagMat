package com.example.tutorApp.request;

import com.example.tutorApp.dto.teacher.GradedAnswerDTO;

import java.util.List;

public record GradeSubmissionAnswersRequest(List<GradedAnswerDTO> grades) {}

