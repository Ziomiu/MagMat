package com.example.tutorApp.controller;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.Quiz;
import com.example.tutorApp.service.QuizService;
import com.example.tutorApp.utils.QuizMapper;
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

    @GetMapping
    public ResponseEntity<List<QuizDTO>> getQuizzes() {
        return ResponseEntity.ok(quizService.getQuizzes());
    }

    @PostMapping
    public ResponseEntity<String> createQuiz(@RequestBody QuizDTO quizDTO) {
        quizService.saveQuizFromDTO(quizDTO);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizDTO> getQuizById(@PathVariable UUID id) {
        return ResponseEntity.ok(QuizMapper.toQuizDTO(quizService.getQuizById(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuizById(@PathVariable UUID id) {
        quizService.deleteQuizById(id);
        return ResponseEntity.ok("");
    }
}
