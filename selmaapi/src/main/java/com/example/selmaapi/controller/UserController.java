package com.example.selmaapi.controller;

import com.example.selmaapi.entity.User;
import com.example.selmaapi.service.UserService;
import com.example.selmaapi.dto.LoginRequest;
import com.example.selmaapi.dto.RegisterRequest;
import com.example.selmaapi.dto.ChangePasswordRequest;
import com.example.selmaapi.dto.UpdateProfileRequest;
import com.example.selmaapi.dto.UpdateProfilePictureRequest;
import com.example.selmaapi.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
                    request.getUsername(),
                    request.getPassword(),
                    request.getFirstName(),
                    request.getLastName()
            );
            if (created == null) {
                return ResponseEntity.badRequest().body("Email or username already exists");
            }
            return ResponseEntity.ok(toUserResponse(created));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String identifier = request.resolveIdentifier();
        User found = userService.authenticateUser(identifier, request.getPassword());
        if (found == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(toUserResponse(found));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        try {
            User updated = userService.updateProfile(
                    id,
                    request.getUsername(),
                    request.getFirstName(),
                    request.getLastName()
            );
            if (updated == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            return ResponseEntity.ok(toUserResponse(updated));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping("/profile/{id}/password")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(id, request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping("/profile/{id}/picture")
    public ResponseEntity<?> updateProfilePicture(@PathVariable Long id, @RequestBody UpdateProfilePictureRequest request) {
        try {
            User updated = userService.updateProfilePicture(id, request.getProfilePicture());
            if (updated == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            return ResponseEntity.ok(toUserResponse(updated));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/profile/{id}/picture/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            User updated = userService.uploadAndUpdateProfilePicture(id, file);
            if (updated == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            return ResponseEntity.ok(toUserResponse(updated));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    private UserResponse toUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setProfilePicture(user.getProfilePicture());
        return response;
    }
}
