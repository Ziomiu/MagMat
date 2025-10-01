package com.example.tutorApp.service;

import com.example.tutorApp.dto.quiz.QuizDTO;
import com.example.tutorApp.dto.student.StudentAnswerFeedbackDTO;
import com.example.tutorApp.dto.student.StudentSubmissionFeedbackDTO;
import com.example.tutorApp.dto.student.StudentSubmissionDTO;
import com.example.tutorApp.entity.*;
import com.example.tutorApp.errors.AssignmentNotFoundException;
import com.example.tutorApp.errors.QuizAlreadyCompletedException;
import com.example.tutorApp.errors.QuizNotFound;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import com.example.tutorApp.repository.StudentAnswerRepository;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.response.StudentResponse;
import com.example.tutorApp.utils.QuizUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
                .filter(a -> !a.getAnswers().isEmpty())
                .map(a -> {
                    boolean graded = a.getAnswers().stream()
                            .allMatch(ans -> ans.getAnswerStatus() != AnswerStatus.PENDING);

                    return new StudentSubmissionDTO(
                            a.getId(),
                            a.getQuiz().getId(),
                            a.getQuiz().getTitle(),
                            graded
                    );
                })
                .toList();
    }

    public StudentSubmissionFeedbackDTO getAnswersFeedback(UUID submissionId, UUID studentId) {
        QuizAssignment assignment = assignmentRepo.findById(submissionId)
                .orElseThrow(() -> new NoSuchElementException("Assignment not found"));

        if (!assignment.getStudent().getId().equals(studentId)) {
            throw new AccessDeniedException("Not your submission");
        }

        List<StudentAnswer> answers = answerRepo.findByAssignmentId(submissionId);

        // Group student answers by question
        Map<UUID, List<StudentAnswer>> grouped = answers.stream()
                .collect(Collectors.groupingBy(sa -> sa.getQuestion().getId()));

        List<StudentAnswerFeedbackDTO> answerDtos = grouped.values().stream()
                .map(answerGroup -> {
                    StudentAnswer first = answerGroup.get(0);

                    List<String> studentAnswerTexts = answerGroup.stream()
                            .map(sa -> sa.getAnswer() != null
                                    ? sa.getAnswer().getText()
                                    : sa.getTextAnswer())
                            .filter(Objects::nonNull)
                            .toList();

                    List<String> correctAnswerTexts = first.getQuestion().getAnswers().stream()
                            .filter(QuizAnswer::getIsCorrect)
                            .map(QuizAnswer::getText)
                            .toList();

                    Set<AnswerStatus> statuses = answerGroup.stream()
                            .map(StudentAnswer::getAnswerStatus)
                            .collect(Collectors.toSet());

                    AnswerStatus questionStatus;
                    if (statuses.contains(AnswerStatus.PENDING)) {
                        questionStatus = AnswerStatus.PENDING;
                    } else if (statuses.size() == 1) {
                        questionStatus = statuses.iterator().next();
                    } else {
                        questionStatus = AnswerStatus.PARTIAL;
                    }

                    return new StudentAnswerFeedbackDTO(
                            first.getQuestion().getId(),
                            first.getQuestion().getText(),
                            studentAnswerTexts,
                            correctAnswerTexts,
                            questionStatus.name(),
                            first.getComment()
                    );
                })
                .toList();

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

    public QuizDTO getAssignedQuiz(UUID userId, UUID quizId) {
        QuizAssignment quizAssignment =
                assignmentRepo.findByStudentIdAndQuizId(userId, quizId).orElseThrow(AssignmentNotFoundException::new);
        if (!quizAssignment.getCompleted()) {
            return QuizUtils.toQuizDTO(quizAssignment.getQuiz());
        } else {
            throw new QuizAlreadyCompletedException();
        }

    }
}
