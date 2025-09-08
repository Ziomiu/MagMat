package com.example.tutorApp.service;

import com.example.tutorApp.model.Quiz;
import com.example.tutorApp.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
    }
}
