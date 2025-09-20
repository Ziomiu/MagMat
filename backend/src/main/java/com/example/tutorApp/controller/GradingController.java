package com.example.tutorApp.controller;

import com.example.tutorApp.dto.SubmissionDetailsDTO;
import com.example.tutorApp.dto.SubmissionSummaryDTO;
import com.example.tutorApp.request.GradeSubmissionRequest;
import com.example.tutorApp.service.GradingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/teacher")
public class GradingController {
    private final GradingService gradingService;

    public GradingController(GradingService gradingService) {
        this.gradingService = gradingService;
    }

    @GetMapping("/quiz/{quizId}/submissions")
    public ResponseEntity<List<SubmissionSummaryDTO>> getQuizSubmissions(@PathVariable UUID quizId) {
        return ResponseEntity.ok(gradingService.listSubmissionsForQuiz(quizId));
    }

    @GetMapping("/submission/{assignmentId}")
    public ResponseEntity<SubmissionDetailsDTO> getSubmissionDetails(@PathVariable UUID assignmentId) {
        return ResponseEntity.ok(gradingService.getSubmissionDetail(assignmentId));
    }

    @PostMapping("/submission/grade")
    public ResponseEntity<?> gradeSubmission(@RequestBody GradeSubmissionRequest request) {
        gradingService.gradeSubmission(request.grades());
        return ResponseEntity.ok().build();
    }
}
