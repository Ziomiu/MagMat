package com.example.tutorApp.service;

import com.example.tutorApp.dto.StudentSubmissionDTO;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class StudentService {
    private final QuizAssignmentRepository assignmentRepo;

    public StudentService(QuizAssignmentRepository assignmentRepo) {
        this.assignmentRepo = assignmentRepo;
    }

    public List<StudentSubmissionDTO> getStudentSubmissions(UUID studentId) {
        return assignmentRepo.findByStudentId(studentId).stream()
                .map(a -> new StudentSubmissionDTO(
                        a.getId(),
                        a.getQuiz().getId(),
                        a.getQuiz().getTitle(),
                        a.getAnswers().stream().anyMatch(ans -> ans.getCorrect() != null)
                ))
                .toList();
    }
}
