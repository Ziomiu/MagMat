package com.example.tutorApp.service;

import com.example.tutorApp.dto.student.StudentAnswerFeedbackDTO;
import com.example.tutorApp.dto.student.StudentSubmissionFeedbackDTO;
import com.example.tutorApp.dto.student.StudentSubmissionDTO;
import com.example.tutorApp.entity.*;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import com.example.tutorApp.repository.StudentAnswerRepository;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.response.StudentResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {
    private final QuizAssignmentRepository assignmentRepo;
    private final StudentAnswerRepository answerRepo;
    private final UserRepository userRepo;

    public StudentService(QuizAssignmentRepository assignmentRepo, StudentAnswerRepository answerRepo, UserRepository userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.answerRepo = answerRepo;
        this.userRepo = userRepo;
    }

    public List<StudentSubmissionDTO> getStudentSubmissions(UUID studentId) {
        return assignmentRepo.findByStudentId(studentId).stream()
                .map(a -> new StudentSubmissionDTO(
                        a.getId(),
                        a.getQuiz().getId(),
                        a.getQuiz().getTitle(),
                        a.getAnswers().stream().allMatch(ans -> ans.getAnswerStatus() != AnswerStatus.PENDING)
                ))
                .toList();
    }

    public StudentSubmissionFeedbackDTO getAnswersFeedback(UUID submissionId, UUID studentId) {
        QuizAssignment assignment = assignmentRepo.findById(submissionId).orElseThrow();

        if (!assignment.getStudent().getId().equals(studentId))
            throw new AccessDeniedException("Not your submission");

        List<StudentAnswer> answers = answerRepo.findByAssignmentId(submissionId);

        List<StudentAnswerFeedbackDTO> answerDtos = answers.stream().map(sa -> {
            String studentAnswerText = sa.getAnswer() != null
                    ? sa.getAnswer().getText()
                    : sa.getTextAnswer();

            String correctAnswerText = sa.getQuestion().getAnswers().stream()
                    .filter(QuizAnswer::getIsCorrect)
                    .map(QuizAnswer::getText)
                    .findFirst()
                    .orElse(null);

            return new StudentAnswerFeedbackDTO(
                    sa.getQuestion().getId(),
                    sa.getQuestion().getText(),
                    studentAnswerText,
                    correctAnswerText,
                    sa.getAnswerStatus().name(),
                    sa.getComment()
            );
        }).toList();

        return new StudentSubmissionFeedbackDTO(
                assignment.getId(),
                assignment.getQuiz().getId(),
                assignment.getQuiz().getTitle(),
                answerDtos
        );
    }

    public List<StudentResponse> findAllStudents() {
        List<AppUser> users = userRepo.findByUserRoleEquals(UserRole.STUDENT);
        return users.stream().map(user -> new StudentResponse(user.getId(), user.getName(),
                user.getSurname())).toList();
    }
}
