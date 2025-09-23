package com.example.tutorApp.service;

import com.example.tutorApp.dto.AnswerGradeDTO;
import com.example.tutorApp.dto.StudentAnswerDTO;
import com.example.tutorApp.dto.SubmissionDetailsDTO;
import com.example.tutorApp.dto.SubmissionSummaryDTO;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.entity.QuizAssignment;
import com.example.tutorApp.entity.StudentAnswer;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import com.example.tutorApp.repository.QuizRepository;
import com.example.tutorApp.repository.StudentAnswerRepository;
import com.example.tutorApp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class GradingService {
    private final QuizAssignmentRepository assignmentRepo;
    private final StudentAnswerRepository answerRepo;

    public GradingService(QuizAssignmentRepository assignmentRepo, StudentAnswerRepository answerRepo, UserRepository userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.answerRepo = answerRepo;
    }

    public List<SubmissionSummaryDTO> listSubmissionsForQuiz(UUID quizId) {
        List<QuizAssignment> assignments = assignmentRepo.findByQuizId(quizId);
        return assignments.stream()
                .map(a -> new SubmissionSummaryDTO(
                        a.getId(),
                        a.getStudent().getId(),
                        a.getStudent().getName(),
                        a.getStudent().getSurname(),
                        a.getCompleted()
                ))
                .toList();
    }

    public SubmissionDetailsDTO getSubmissionDetail(UUID assignmentId) {
        QuizAssignment assignment = assignmentRepo.findById(assignmentId).orElseThrow();
        List<StudentAnswer> answers = answerRepo.findByAssignmentId(assignmentId);

        List<StudentAnswerDTO> answerDtos = answers.stream().map(sa ->
                new StudentAnswerDTO(
                        sa.getId(),
                        sa.getQuestion().getId(),
                        sa.getQuestion().getText(),
                        sa.getAnswer() != null ? sa.getAnswer().getId() : null,
                        sa.getAnswer() != null ? sa.getAnswer().getText() : null,
                        sa.getTextAnswer(),
                        sa.getCorrect(),
                        sa.getComment()
                )
        ).toList();

        return new SubmissionDetailsDTO(
                assignment.getId(),
                assignment.getQuiz().getId(),
                assignment.getStudent().getId(),
                assignment.getStudent().getName(),
                assignment.getStudent().getSurname(),
                null,
                answerDtos
        );
    }

    @Transactional
    public void gradeSubmission(List<AnswerGradeDTO> grades) {
        for (AnswerGradeDTO g : grades) {
            StudentAnswer sa = answerRepo.findById(g.studentAnswerId())
                    .orElseThrow();
            sa.setCorrect(g.correct());
            sa.setComment(g.comment());
            answerRepo.save(sa);
        }
    }
    public List<SubmissionSummaryDTO> getQuizSubmissions(UUID quizId) {
        return assignmentRepo.findByQuizId(quizId).stream()
                .map(a -> new SubmissionSummaryDTO(
                        a.getId(),
                        a.getStudent().getId(),
                        a.getStudent().getName(),
                        a.getStudent().getSurname(),
                        a.getAnswers().stream().anyMatch(ans -> ans.getCorrect() != null)
                ))
                .toList();
    }
}
