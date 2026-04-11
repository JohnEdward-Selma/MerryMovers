package com.example.merry_movers_backend.features.auth.service;

import com.example.merry_movers_backend.features.auth.model.User;
import com.example.merry_movers_backend.features.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Test
    void registerUserHashesPasswordBeforeSave() {
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        SupabaseStorageService supabaseStorageService = mock(SupabaseStorageService.class);
        UserService userService = new UserService(userRepository, passwordEncoder, supabaseStorageService);

        when(userRepository.findByEmail("test@example.com")).thenReturn(null);
        when(userRepository.findByUsername("testuser")).thenReturn(null);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        String rawPassword = "PlainPass123";
        User created = userService.registerUser("test@example.com", "testuser", rawPassword, "Test", "User");

        assertNotNull(created);
        assertNotNull(created.getPassword());
        assertNotEquals(rawPassword, created.getPassword());
        assertTrue(passwordEncoder.matches(rawPassword, created.getPassword()));
    }
}

