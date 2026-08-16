package com.theseusoft.dto;
import com.theseusoft.entity.TicketStatus; import java.time.Instant;
public record SupportTicketResponse(Long id, String ticketNumber, String name, String email, String company, String category, String subject, String message, TicketStatus status, Instant createdAt) { }
