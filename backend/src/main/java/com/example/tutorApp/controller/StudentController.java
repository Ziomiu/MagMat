package com.example.tutorApp.controller;

import com.example.tutorApp.dto.student.StudentSubmissionFeedbackDTO;
import com.example.tutorApp.dto.student.StudentSubmissionDTO;
import com.example.tutorApp.response.StudentResponse;
import com.example.tutorApp.service.StudentService;
import com.example.tutorApp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    private final UserService userService;

    public StudentController(StudentService studentService, UserService userService) {
        this.studentService = studentService;
        this.userService = userService;
    }

    @GetMapping("/{userId}/submissions")
    public ResponseEntity<List<StudentSubmissionDTO>> getMySubmissions(@PathVariable UUID userId) {
        return ResponseEntity.ok(studentService.getStudentSubmissions(userId));
    }

    @GetMapping("/{userId}/submission/{submissionId}/feedback")
    public ResponseEntity<StudentSubmissionFeedbackDTO> getFeedback(@PathVariable UUID userId,
                                                                    @PathVariable UUID submissionId) {
        return ResponseEntity.ok(studentService.getAnswersFeedback(submissionId, userId));
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        return ResponseEntity.ok(studentService.findAllStudents());
    }

}
