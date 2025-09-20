package com.example.tutorApp.request;

import com.example.tutorApp.dto.AnswerGradeDTO;

import java.util.List;

public record GradeSubmissionRequest(List<AnswerGradeDTO> grades) {}

