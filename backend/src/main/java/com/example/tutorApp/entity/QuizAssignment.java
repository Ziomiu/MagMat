package com.example.tutorApp.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class QuizAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private AppUser student;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    private boolean completed = false;
    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentAnswer> answers;

    public UUID getId() {
        return id;
    }

    public AppUser getStudent() {
        return student;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setStudent(AppUser student) {
        this.student = student;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public List<StudentAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<StudentAnswer> answers) {
        this.answers = answers;
    }
}
