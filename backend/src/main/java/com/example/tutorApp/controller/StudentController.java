package com.example.tutorApp.controller;

import com.example.tutorApp.dto.StudentFeedbackSubmissionDTO;
import com.example.tutorApp.dto.StudentSubmissionDTO;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.security.CustomUserDetails;
import com.example.tutorApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<StudentSubmissionDTO>> getMySubmissions(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(studentService.getStudentSubmissions(userDetails.getUser().getId()));
    }

    @GetMapping("/submission/{submissionId}/feedback")
    public ResponseEntity<StudentFeedbackSubmissionDTO> getFeedback(@PathVariable UUID submissionId,
                                                                    @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(studentService.getFeedback(submissionId, userDetails.getUser().getId()));
    }

}
