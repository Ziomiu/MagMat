package com.example.tutorApp.service;

import com.example.tutorApp.dto.teacher.GradedAnswerDTO;
import com.example.tutorApp.dto.teacher.SubmittedStudentAnswerDTO;
import com.example.tutorApp.dto.teacher.SubmissionDetailsDTO;
import com.example.tutorApp.dto.teacher.SubmissionSummaryDTO;
import com.example.tutorApp.entity.AnswerStatus;
import com.example.tutorApp.entity.QuizAssignment;
import com.example.tutorApp.entity.StudentAnswer;
import com.example.tutorApp.repository.QuizAssignmentRepository;
import com.example.tutorApp.repository.StudentAnswerRepository;
import com.example.tutorApp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TeacherService {
    private final QuizAssignmentRepository assignmentRepo;
    private final StudentAnswerRepository answerRepo;

    public TeacherService(QuizAssignmentRepository assignmentRepo, StudentAnswerRepository answerRepo, UserRepository userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.answerRepo = answerRepo;
    }

    public List<SubmissionSummaryDTO> getSubmissionsForQuiz(UUID quizId) {
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

        List<SubmittedStudentAnswerDTO> answerDTO = answers.stream().map(sa ->
                new SubmittedStudentAnswerDTO(
                        sa.getId(),
                        sa.getQuestion().getId(),
                        sa.getQuestion().getText(),
                        sa.getAnswer() != null ? sa.getAnswer().getId() : null,
                        sa.getAnswer() != null ? sa.getAnswer().getText() : null,
                        sa.getTextAnswer(),
                        sa.getAnswerStatus().name(),
                        sa.getComment()
                )
        ).toList();

        return new SubmissionDetailsDTO(
                assignment.getId(),
                assignment.getQuiz().getId(),
                assignment.getStudent().getId(),
                assignment.getStudent().getName(),
                assignment.getStudent().getSurname(),
                answerDTO
        );
    }

    @Transactional
    public void gradeSubmissionAnswers(List<GradedAnswerDTO> grades) {
        for (GradedAnswerDTO g : grades) {
            StudentAnswer sa = answerRepo.findById(g.studentAnswerId())
                    .orElseThrow();
            System.out.println(g.answerStatus());
            sa.setAnswerStatus(AnswerStatus.valueOf(g.answerStatus()));
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
                        a.getAnswers().stream().anyMatch(ans -> ans.getAnswerStatus() != null)
                ))
                .toList();
    }
}
