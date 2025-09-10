package com.example.tutorApp.controller;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.Quiz;
import com.example.tutorApp.service.QuizService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    private final QuizService quizService;
    private final Logger logger = LoggerFactory.getLogger(QuizController.class);

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getQuizzes() {
        return ResponseEntity.ok(quizService.getQuizzes());
    }

    @PostMapping
    public ResponseEntity<String> createQuiz(@RequestBody QuizDTO quizDTO) {
        quizService.saveQuizFromDTO(quizDTO);
        return ResponseEntity.ok("");
    }
}
