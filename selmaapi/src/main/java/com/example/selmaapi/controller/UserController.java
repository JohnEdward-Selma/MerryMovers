package com.example.selmaapi.controller;

import com.example.selmaapi.entity.User;
import com.example.selmaapi.service.UserService;
import com.example.selmaapi.dto.LoginRequest;
import com.example.selmaapi.dto.RegisterRequest;
import com.example.selmaapi.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User created = userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
        if (created == null) {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }
        UserResponse response = new UserResponse();
        response.setId(created.getId());
        response.setUsername(created.getUsername());
        response.setEmail(created.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User found = userService.authenticateUser(request.getUsername(), request.getPassword());
        if (found == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        UserResponse response = new UserResponse();
        response.setId(found.getId());
        response.setUsername(found.getUsername());
        response.setEmail(found.getEmail());
        return ResponseEntity.ok(response);
    }
}
