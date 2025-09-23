package com.example.tutorApp.service;

import com.example.tutorApp.dto.StudentFeedbackAnswerDTO;
import com.example.tutorApp.dto.StudentFeedbackSubmissionDTO;
import com.example.tutorApp.dto.StudentSubmissionDTO;
import com.example.tutorApp.entity.QuizAnswer;
import com.example.tutorApp.entity.QuizAssignment;
import com.example.tutorApp.entity.StudentAnswer;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import com.example.tutorApp.repository.StudentAnswerRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {
    private final QuizAssignmentRepository assignmentRepo;
    private final StudentAnswerRepository answerRepo;

    public StudentService(QuizAssignmentRepository assignmentRepo, StudentAnswerRepository answerRepo) {
        this.assignmentRepo = assignmentRepo;
        this.answerRepo = answerRepo;
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

    public StudentFeedbackSubmissionDTO getFeedback(UUID submissionId, UUID studentId) {
        QuizAssignment assignment = assignmentRepo.findById(submissionId).orElseThrow();

        if (!assignment.getStudent().getId().equals(studentId))
            throw new AccessDeniedException("Not your submission");

        List<StudentAnswer> answers = answerRepo.findByAssignmentId(submissionId);

        List<StudentFeedbackAnswerDTO> answerDtos = answers.stream().map(sa -> {
            String studentAnswerText = sa.getAnswer() != null
                    ? sa.getAnswer().getText()
                    : sa.getTextAnswer();

            String correctAnswerText = sa.getQuestion().getAnswers().stream()
                    .filter(QuizAnswer::getIsCorrect)
                    .map(QuizAnswer::getText)
                    .findFirst()
                    .orElse(null);

            return new StudentFeedbackAnswerDTO(
                    sa.getQuestion().getId(),
                    sa.getQuestion().getText(),
                    studentAnswerText,
                    correctAnswerText,
                    sa.getCorrect(),
                    sa.getComment()
            );
        }).toList();

        return new StudentFeedbackSubmissionDTO(
                assignment.getId(),
                assignment.getQuiz().getId(),
                assignment.getQuiz().getTitle(),
                answerDtos
        );
    }
}
