package com.theseusoft.dto;
import jakarta.validation.constraints.*;
public record ContactMessageRequest(@NotBlank @Size(max=120) String name, @NotBlank @Email @Size(max=180) String email, @Size(max=180) String company, @NotBlank @Size(max=8000) String message) { }
