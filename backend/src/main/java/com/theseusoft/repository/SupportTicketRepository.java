package com.theseusoft.repository;
import com.theseusoft.entity.SupportTicket; import org.springframework.data.jpa.repository.JpaRepository;
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> { }
