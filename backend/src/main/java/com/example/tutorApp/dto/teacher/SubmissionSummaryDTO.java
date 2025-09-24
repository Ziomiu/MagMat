package com.example.tutorApp.dto.teacher;

import java.util.UUID;

public record SubmissionSummaryDTO(UUID submissionId,
                                   UUID studentId,
                                   String name,
                                   String surname,
                                   boolean completed) {}

