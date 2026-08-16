package com.theseusoft.entity;
import jakarta.persistence.*; import java.time.Instant;
@Entity
public class ContactMessage {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String name; @Column(nullable=false,length=180) private String email; private String company;
 @Column(nullable=false,columnDefinition="TEXT") private String message; @Column(nullable=false,updatable=false) private Instant createdAt=Instant.now();
 public Long getId(){return id;} public String getName(){return name;} public String getEmail(){return email;} public String getCompany(){return company;} public String getMessage(){return message;} public Instant getCreatedAt(){return createdAt;}
 public void setName(String v){name=v;} public void setEmail(String v){email=v;} public void setCompany(String v){company=v;} public void setMessage(String v){message=v;}
}
