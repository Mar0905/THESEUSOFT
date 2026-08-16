package com.theseusoft.controller;
import com.theseusoft.dto.*; import com.theseusoft.service.AuthService; import jakarta.validation.Valid; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") public class AuthController {private final AuthService service; public AuthController(AuthService service){this.service=service;} @PostMapping("/login") public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){return ResponseEntity.ok(service.login(request));}}
