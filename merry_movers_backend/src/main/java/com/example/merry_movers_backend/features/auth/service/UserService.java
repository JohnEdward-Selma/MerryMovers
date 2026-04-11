package com.example.merry_movers_backend.features.auth.service;

import com.example.merry_movers_backend.features.auth.model.User;
import com.example.merry_movers_backend.features.auth.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    private static final String DEFAULT_PROFILE_PICTURE_URL =
            "https://fzfmsrafqxdsyazfqgts.supabase.co/storage/v1/object/public/profile_picture/default_pfp.jpg";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
        private final SupabaseStorageService supabaseStorageService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, SupabaseStorageService supabaseStorageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.supabaseStorageService = supabaseStorageService;
    }

    public User registerUser(String email, String username, String password, String firstName, String lastName) {
        if (userRepository.findByEmail(email) != null || userRepository.findByUsername(username) != null) {
            return null; // Email or username already exists
        }
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(hashPassword(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setProfilePicture(DEFAULT_PROFILE_PICTURE_URL);
        user.setRole("CUSTOMER");
        user.setCreatedAt(OffsetDateTime.now());
        return userRepository.save(user);
    }

    public User authenticateUser(String identifier, String password) {
        User user = userRepository.findByEmail(identifier);
        if (user == null) {
            user = userRepository.findByUsername(identifier);
        }
        if (user == null) {
            return null;
        }

        String storedPassword = user.getPassword();
        if (storedPassword == null) {
            return null;
        }

        if (passwordEncoder.matches(password, storedPassword)) {
            return user;
        }

        if (storedPassword.equals(password)) {
            user.setPassword(hashPassword(password));
            userRepository.save(user);
            return user;
        }

        return null;
    }

    public User updateProfile(Long id, String username, String firstName, String lastName) {
        Optional<User> maybeUser = userRepository.findById(id);
        if (maybeUser.isEmpty()) {
            return null;
        }

        String normalizedUsername = normalizeRequired(username, "Username");
        String normalizedFirstName = normalizeRequired(firstName, "First name");
        String normalizedLastName = normalizeRequired(lastName, "Last name");

        User existingByUsername = userRepository.findByUsername(normalizedUsername);
        if (existingByUsername != null && !existingByUsername.getId().equals(id)) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = maybeUser.get();
        user.setUsername(normalizedUsername);
        user.setFirstName(normalizedFirstName);
        user.setLastName(normalizedLastName);
        return userRepository.save(user);
    }

    public void changePassword(Long id, String currentPassword, String newPassword) {
        Optional<User> maybeUser = userRepository.findById(id);
        if (maybeUser.isEmpty()) {
            throw new IllegalStateException("User not found");
        }

        User user = maybeUser.get();
        String storedPassword = user.getPassword();
        if (storedPassword == null || storedPassword.isBlank()) {
            throw new IllegalArgumentException("Current password is invalid");
        }

        if (currentPassword == null || currentPassword.isBlank()) {
            throw new IllegalArgumentException("Current password is required");
        }

        boolean currentPasswordMatches = passwordEncoder.matches(currentPassword, storedPassword) || storedPassword.equals(currentPassword);
        if (!currentPasswordMatches) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        String normalizedNewPassword = normalizeRequired(newPassword, "New password");
        validatePasswordStrength(normalizedNewPassword);

        if (passwordEncoder.matches(normalizedNewPassword, storedPassword) || storedPassword.equals(normalizedNewPassword)) {
            throw new IllegalArgumentException("New password must be different from current password");
        }

        user.setPassword(hashPassword(normalizedNewPassword));
        userRepository.save(user);
    }

    public User updateProfilePicture(Long id, String profilePicture) {
        Optional<User> maybeUser = userRepository.findById(id);
        if (maybeUser.isEmpty()) {
            return null;
        }

        String normalizedUrl = normalizeRequired(profilePicture, "Profile picture");
        User user = maybeUser.get();
        user.setProfilePicture(normalizedUrl);
        return userRepository.save(user);
    }

    public User uploadAndUpdateProfilePicture(Long id, MultipartFile file) {
        Optional<User> maybeUser = userRepository.findById(id);
        if (maybeUser.isEmpty()) {
            return null;
        }

        String uploadedUrl = supabaseStorageService.uploadProfilePicture(id, file);
        User user = maybeUser.get();
        user.setProfilePicture(uploadedUrl);
        return userRepository.save(user);
    }

    private String normalizeRequired(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required");
        }
        return value.trim();
    }

    private void validatePasswordStrength(String password) {
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException("Password must include at least one lowercase letter");
        }
        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must include at least one number");
        }
        if (!password.matches(".*[^A-Za-z0-9].*")) {
            throw new IllegalArgumentException("Password must include at least one special character");
        }
    }

    private String hashPassword(String rawPassword) {
        if (rawPassword == null || rawPassword.isBlank()) {
            throw new IllegalArgumentException("Password must not be blank");
        }
        return passwordEncoder.encode(rawPassword);
    }
}

