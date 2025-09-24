package com.example.tutorApp.request;

import java.util.List;
import java.util.UUID;

public record AssignStudentsRequest(List<UUID> studentIds) {
}
