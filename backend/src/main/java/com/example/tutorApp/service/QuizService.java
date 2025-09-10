package com.example.tutorApp.service;

import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.entity.*;
import com.example.tutorApp.errors.UserNotFoundException;
import com.example.tutorApp.repository.QuizRepository;
import com.example.tutorApp.repository.UserRepository;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
    }

    public void saveQuizFromDTO(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setDescription(quizDTO.getDescription());
        quiz.setStartDate(quizDTO.getStartDate());
        quiz.setEndDate(quizDTO.getEndDate());


        AppUser appUser =
                userRepository.findById(quizDTO.getCreatedById()).orElseThrow(UserNotFoundException::new);
        quiz.setCreatedBy(appUser);

        if (quizDTO.getQuestions() != null) {
            List<QuizQuestion> questions = quizDTO.getQuestions().stream().map(questionDTO -> {
                QuizQuestion quizQuestion = new QuizQuestion();
                quizQuestion.setText(questionDTO.getText());
                quizQuestion.setType(QuestionType.valueOf(questionDTO.getType().toUpperCase()));
                quizQuestion.setQuiz(quiz);

                if (questionDTO.getAnswers() != null) {
                    List<QuizAnswer> answers = questionDTO.getAnswers().stream().map(answerDTO -> {
                        QuizAnswer quizAnswer = new QuizAnswer();
                        quizAnswer.setText(answerDTO.getText());
                        quizAnswer.setCorrect(answerDTO.isCorrect());
                        quizAnswer.setQuestion(quizQuestion);
                        return quizAnswer;
                    }).toList();
                }
                return quizQuestion;
            }).toList();
            quiz.setQuestions(questions);
        }
        quizRepository.save(quiz);
    }
}
