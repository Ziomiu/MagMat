package com.example.tutorApp.service;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.*;
import com.example.tutorApp.errors.AssignmentNotFoundException;
import com.example.tutorApp.errors.QuizNotFound;
import com.example.tutorApp.errors.UserNotFoundException;
import com.example.tutorApp.repository.*;
import com.example.tutorApp.request.QuizSubmissionRequest;
import com.example.tutorApp.request.SubmittedAnswerRequest;
import com.example.tutorApp.utils.QuizUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuizAssignmentRepository quizAssignmentRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final StudentAnswerRepository studentAnswerRepository;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository,
                       QuizAssignmentRepository quizAssignmentRepository, QuizQuestionRepository quizQuestionRepository,
                       QuizAnswerRepository quizAnswerRepository, StudentAnswerRepository studentAnswerRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.quizAssignmentRepository = quizAssignmentRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizAnswerRepository = quizAnswerRepository;
        this.studentAnswerRepository = studentAnswerRepository;
    }

    public List<QuizDTO> getQuizByCreatedById(UUID id) {
        AppUser user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return quizRepository.findQuizByCreatedBy(user).stream().map(QuizUtils::toQuizDTO).toList();
    }

    public void saveQuizFromDTO(QuizDTO quizDTO) {
        Quiz quiz = QuizUtils.toQuizEntity(quizDTO);
        AppUser appUser =
                userRepository.findById(quizDTO.createdById()).orElseThrow(UserNotFoundException::new);
        quiz.setCreatedBy(appUser);
        quizRepository.save(quiz);
    }

    public Quiz getQuizById(UUID id) {
        return quizRepository.findById(id).orElseThrow(QuizNotFound::new);
    }

    public void deleteQuizById(UUID id) {
        quizRepository.findById(id).orElseThrow(QuizNotFound::new);
        quizRepository.deleteById(id);
    }

    public void updateQuizById(UUID id, QuizDTO quizDTO) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(QuizNotFound::new);
        QuizUtils.updateQuiz(quiz, quizDTO);
        quizRepository.save(quiz);
    }

    public void assignQuizToUser(UUID quizId, List<UUID> studentId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(QuizNotFound::new);
        for (UUID student : studentId) {
            AppUser appUser = userRepository.findById(student).orElseThrow(UserNotFoundException::new);
            QuizAssignment quizAssignment = new QuizAssignment();
            quizAssignment.setQuiz(quiz);
            quizAssignment.setStudent(appUser);
            quizAssignmentRepository.save(quizAssignment);
        }
    }

    public List<QuizDTO> getAssignedQuizzes(UUID studentId) {
        List<QuizAssignment> assignments = quizAssignmentRepository.findByStudentId(studentId);
        return assignments.stream().map(q -> {
                    return QuizUtils.toQuizDTO(q.getQuiz());
                })
                .toList();
    }

    public void submitQuizAnswers(QuizSubmissionRequest quizSubmissionRequest) {
        AppUser student =
                userRepository.findById(quizSubmissionRequest.studentId()).orElseThrow(UserNotFoundException::new);
        QuizAssignment assignment = quizAssignmentRepository
                .findByStudentIdAndQuizId(student.getId(), quizSubmissionRequest.quizId())
                .orElseThrow(AssignmentNotFoundException::new);
        for (SubmittedAnswerRequest sa : quizSubmissionRequest.answers()) {
            QuizQuestion question = quizQuestionRepository.findById(sa.questionId()).orElseThrow();

            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.setAssignment(assignment);
            studentAnswer.setQuestion(question);

            if (sa.answerId() != null) {
                QuizAnswer answer = quizAnswerRepository.findById(sa.answerId()).orElseThrow();
                studentAnswer.setAnswer(answer);
            }

            if (sa.textAnswer() != null && !sa.textAnswer().isBlank()) {
                studentAnswer.setTextAnswer(sa.textAnswer());
            }

            studentAnswerRepository.save(studentAnswer);
        }

    }
}
