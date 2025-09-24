package com.example.tutorApp.dto.teacher;


import java.util.List;
import java.util.UUID;

public record SubmissionDetailsDTO(UUID submissionId,
                                   UUID quizId,
                                   UUID studentId,
                                   String name,
                                   String surname,
                                   List<SubmittedStudentAnswerDTO> answers) {
}
