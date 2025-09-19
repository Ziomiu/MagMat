package com.example.tutorApp.controller;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.Quiz;
import com.example.tutorApp.entity.QuizAssignment;
import com.example.tutorApp.request.AssignStudentsRequest;
import com.example.tutorApp.request.QuizSubmissionRequest;
import com.example.tutorApp.service.QuizService;
import com.example.tutorApp.utils.QuizUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    private final QuizService quizService;
    private final Logger logger = LoggerFactory.getLogger(QuizController.class);

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("user/{id}")
    public ResponseEntity<List<QuizDTO>> getQuizByCreatedById(@PathVariable UUID id) {
        return ResponseEntity.ok(quizService.getQuizByCreatedById(id));
    }

    @PostMapping
    public ResponseEntity<String> createQuiz(@RequestBody QuizDTO quizDTO) {
        quizService.saveQuizFromDTO(quizDTO);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizDTO> getQuizById(@PathVariable UUID id) {
        return ResponseEntity.ok(QuizUtils.toQuizDTO(quizService.getQuizById(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuizById(@PathVariable UUID id) {
        quizService.deleteQuizById(id);
        return ResponseEntity.ok("");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuizById(@PathVariable UUID id, @RequestBody QuizDTO quizDTO) {
        quizService.updateQuizById(id, quizDTO);
        return ResponseEntity.ok("");
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignStudents(@RequestBody AssignStudentsRequest request) {
        quizService.assignQuizToUser(request.quizId(), request.studentIds());
        return ResponseEntity.ok("");
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<QuizDTO>> getQuizzesForStudent(@PathVariable UUID studentId) {
        return ResponseEntity.ok(quizService.getAssignedQuizzes(studentId));
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitQuizAnswers(@RequestBody QuizSubmissionRequest request) {
        quizService.submitQuizAnswers(request);
        return ResponseEntity.ok("");
    }

}
