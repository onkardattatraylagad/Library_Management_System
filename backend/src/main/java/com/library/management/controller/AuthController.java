package com.library.management.controller;

import com.library.management.dto.LoginRequest;
import com.library.management.dto.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        if ("root".equals(request.getUsername()) && "root".equals(request.getPassword())) {
            return ResponseEntity.ok(new LoginResponse("root", "ADMIN", "Login successful"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
