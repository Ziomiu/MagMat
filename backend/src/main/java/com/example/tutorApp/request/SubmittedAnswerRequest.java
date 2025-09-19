package com.example.tutorApp.request;

import java.util.UUID;

public record SubmittedAnswerRequest(UUID questionId, UUID answerId, String textAnswer) {
}
