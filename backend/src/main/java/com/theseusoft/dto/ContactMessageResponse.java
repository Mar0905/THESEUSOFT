package com.theseusoft.dto;
import java.time.Instant;
public record ContactMessageResponse(Long id, String name, String email, String company, String message, Instant createdAt) { }
