package com.theseusoft.entity;

import jakarta.persistence.*; import java.time.Instant;
@Entity
public class SupportTicket {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable=false, unique=true, length=30) private String ticketNumber;
  @Column(nullable=false, length=120) private String name;
  @Column(nullable=false, length=180) private String email;
  private String company;
  @Column(nullable=false) private String category;
  @Column(nullable=false, length=180) private String subject;
  @Column(nullable=false, columnDefinition="TEXT") private String message;
  @Enumerated(EnumType.STRING) @Column(nullable=false) private TicketStatus status = TicketStatus.OPEN;
  @Column(nullable=false, updatable=false) private Instant createdAt = Instant.now();
  public Long getId(){return id;} public String getTicketNumber(){return ticketNumber;} public String getName(){return name;} public String getEmail(){return email;} public String getCompany(){return company;} public String getCategory(){return category;} public String getSubject(){return subject;} public String getMessage(){return message;} public TicketStatus getStatus(){return status;} public Instant getCreatedAt(){return createdAt;}
  public void setTicketNumber(String v){ticketNumber=v;} public void setName(String v){name=v;} public void setEmail(String v){email=v;} public void setCompany(String v){company=v;} public void setCategory(String v){category=v;} public void setSubject(String v){subject=v;} public void setMessage(String v){message=v;} public void setStatus(TicketStatus v){status=v;}
}
