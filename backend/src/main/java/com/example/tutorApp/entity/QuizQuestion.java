package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class QuizQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private String text;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizAnswer> answers;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public QuestionType getType() {
        return type;
    }

    public String getText() {
        return text;
    }

    public List<QuizAnswer> getAnswers() {
        return answers;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setAnswers(List<QuizAnswer> answers) {
        this.answers = answers;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
