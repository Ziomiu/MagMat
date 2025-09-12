package com.example.tutorApp.service;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.*;
import com.example.tutorApp.errors.QuizNotFound;
import com.example.tutorApp.errors.UserNotFoundException;
import com.example.tutorApp.repository.QuizRepository;
import com.example.tutorApp.repository.UserRepository;
import com.example.tutorApp.utils.QuizMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    public List<QuizDTO> getQuizzes() {
        return quizRepository.findAll().stream().map(QuizMapper::toQuizDTO).toList();
    }

    public void saveQuizFromDTO(QuizDTO quizDTO) {
        Quiz quiz = QuizMapper.toQuizEntity(quizDTO);
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
    public void updateQuizById(UUID id , QuizDTO quizDTO) {
        quizRepository.findById(id).orElseThrow(QuizNotFound::new);
        Quiz newQuiz = QuizMapper.toQuizEntity(quizDTO);
        newQuiz.setId(id);
        quizRepository.save(newQuiz);
    }
}
