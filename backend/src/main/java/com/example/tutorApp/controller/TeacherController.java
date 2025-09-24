package com.example.tutorApp.controller;

import com.example.tutorApp.dto.teacher.SubmissionDetailsDTO;
import com.example.tutorApp.dto.teacher.SubmissionSummaryDTO;
import com.example.tutorApp.request.GradeSubmissionAnswersRequest;
import com.example.tutorApp.service.TeacherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/quiz/{quizId}/submissions")
    public ResponseEntity<List<SubmissionSummaryDTO>> getQuizSubmissions(@PathVariable UUID quizId) {
        return ResponseEntity.ok(teacherService.getSubmissionsForQuiz(quizId));
    }

    @GetMapping("/submission/{assignmentId}")
    public ResponseEntity<SubmissionDetailsDTO> getSubmissionDetails(@PathVariable UUID assignmentId) {
        return ResponseEntity.ok(teacherService.getSubmissionDetail(assignmentId));
    }

    @PostMapping("/submission/grade")
    public ResponseEntity<?> gradeSubmission(@RequestBody GradeSubmissionAnswersRequest request) {
        teacherService.gradeSubmissionAnswers(request.grades());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/quiz/{quizId}/submission")
    public ResponseEntity<List<SubmissionSummaryDTO>> getSubmissions(@PathVariable UUID quizId) {
        return ResponseEntity.ok(teacherService.getQuizSubmissions(quizId));
    }
}
