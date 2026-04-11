package com.example.merry_movers_backend.features.auth.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.nio.charset.StandardCharsets;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    @Column(name = "username", unique = true, nullable = false, length = 120)
    private String username;

    @Column(name = "first_name", nullable = false, length = 120)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 120)
    private String lastName;

    @Column(name = "profile_picture")
    private byte[] profilePicture;

    @Column(name = "role", nullable = false, length = 40)
    private String role;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getProfilePicture() {
        if (profilePicture == null) {
            return null;
        }
        return new String(profilePicture, StandardCharsets.UTF_8);
    }
    public void setProfilePicture(String profilePicture) {
        if (profilePicture == null) {
            this.profilePicture = null;
            return;
        }
        this.profilePicture = profilePicture.getBytes(StandardCharsets.UTF_8);
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}

