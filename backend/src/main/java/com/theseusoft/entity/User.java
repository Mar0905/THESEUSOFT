package com.theseusoft.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity @Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, unique = true, length = 80) private String username;
  @Column(nullable = false) private String password;
  @ElementCollection(fetch = FetchType.EAGER) @Enumerated(EnumType.STRING) @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id")) @Column(name = "role") private Set<Role> roles;
  public Long getId() { return id; } public String getUsername() { return username; } public String getPassword() { return password; } public Set<Role> getRoles() { return roles; }
  public void setUsername(String value) { username = value; } public void setPassword(String value) { password = value; } public void setRoles(Set<Role> value) { roles = value; }
}
