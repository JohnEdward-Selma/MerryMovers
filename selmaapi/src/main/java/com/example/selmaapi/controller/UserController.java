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
        try {
            User created = userService.registerUser(
                    request.getEmail(),
                    request.getPassword(),
                    request.getFirstName(),
                    request.getLastName()
            );
            if (created == null) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            UserResponse response = new UserResponse();
            response.setId(created.getId());
            response.setEmail(created.getEmail());
            response.setFirstName(created.getFirstName());
            response.setLastName(created.getLastName());
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User found = userService.authenticateUser(request.getEmail(), request.getPassword());
        if (found == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        UserResponse response = new UserResponse();
        response.setId(found.getId());
        response.setEmail(found.getEmail());
        response.setFirstName(found.getFirstName());
        response.setLastName(found.getLastName());
        return ResponseEntity.ok(response);
    }
}
