package com.theseusoft.repository;
import com.theseusoft.entity.ContactMessage; import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> { }
