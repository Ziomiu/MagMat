package com.example.tutorApp.controller;

import com.example.tutorApp.dto.StudentSubmissionDTO;
import com.example.tutorApp.entity.AppUser;
import com.example.tutorApp.security.CustomUserDetails;
import com.example.tutorApp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
