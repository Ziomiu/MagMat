package com.example.tutorApp.utils;

import com.example.tutorApp.dto.QuizAnswerDTO;
import com.example.tutorApp.dto.QuizDTO;
import com.example.tutorApp.dto.QuizQuestionDTO;
import com.example.tutorApp.entity.QuestionType;
import com.example.tutorApp.entity.Quiz;
import com.example.tutorApp.entity.QuizAnswer;
import com.example.tutorApp.entity.QuizQuestion;

import java.util.List;

public final class QuizMapper {
    private QuizMapper() {

    }

    public static Quiz toQuizEntity(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.title());
        quiz.setDescription(quizDTO.description());
        quiz.setStartDate(quizDTO.startDate());
        quiz.setEndDate(quizDTO.endDate());

        if (quizDTO.questions() != null) {
            List<QuizQuestion> questions = quizDTO.questions().stream()
                    .map(quizQuestionDTO -> {
                        QuizQuestion quizQuestion = toQuestionEntity(quizQuestionDTO);
                        quizQuestion.setQuiz(quiz);
                        return quizQuestion;
                    })
                    .toList();
            quiz.setQuestions(questions);
        }
        return quiz;
    }

    private static QuizQuestion toQuestionEntity(QuizQuestionDTO questionDTO) {
        QuizQuestion quizQuestion = new QuizQuestion();
        quizQuestion.setText(questionDTO.text());
        quizQuestion.setType(QuestionType.valueOf(questionDTO.type().toUpperCase()));

        if (questionDTO.answers() != null) {
            List<QuizAnswer> answers = questionDTO.answers().stream()
                    .map(quizAnswerDTO -> {
                        QuizAnswer quizAnswer = toAnswerEntity(quizAnswerDTO);
                        quizAnswer.setQuestion(quizQuestion);
                        return quizAnswer;
                    })
                    .toList();
            quizQuestion.setAnswers(answers);
        }
        return quizQuestion;
    }

    private static QuizAnswer toAnswerEntity(QuizAnswerDTO answerDTO) {
        QuizAnswer quizAnswer = new QuizAnswer();
        quizAnswer.setText(answerDTO.text());
        quizAnswer.setIsCorrect(answerDTO.correct());
        return quizAnswer;
    }

    public static QuizDTO toQuizDTO(Quiz quiz) {
        List<QuizQuestionDTO> questionDTOs = null;
        if (quiz.getQuestions() != null) {
            questionDTOs = quiz.getQuestions().stream()
                    .map(QuizMapper::toQuestionDTO)
                    .toList();
        }

        return new QuizDTO(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getStartDate(),
                quiz.getEndDate(),
                questionDTOs,
                quiz.getCreatedBy().getId()
        );

    }

    private static QuizQuestionDTO toQuestionDTO(QuizQuestion quizQuestion) {
        List<QuizAnswerDTO> answerDTOs = null;
        if (quizQuestion.getAnswers() != null) {
            answerDTOs = quizQuestion.getAnswers().stream()
                    .map(QuizMapper::toQuizAnswerDTO)
                    .toList();
        }

        return new QuizQuestionDTO(
                quizQuestion.getId(),
                quizQuestion.getText(),
                quizQuestion.getType().name(),
                answerDTOs
        );

    }

    private static QuizAnswerDTO toQuizAnswerDTO(QuizAnswer quizAnswer) {
        return new QuizAnswerDTO(
                quizAnswer.getId(),
                quizAnswer.getText(),
                quizAnswer.getIsCorrect()
        );
    }

}
