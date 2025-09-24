package com.example.tutorApp.response;

import java.util.UUID;

public record StudentResponse(UUID studentId,
                              String name,
                              String surname) {
}
