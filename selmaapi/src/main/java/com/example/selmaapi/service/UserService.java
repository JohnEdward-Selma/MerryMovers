package com.example.selmaapi.service;

import com.example.selmaapi.entity.User;
import com.example.selmaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(String email, String password, String firstName, String lastName) {
        if (userRepository.findByEmail(email) != null) {
            return null; // Email already exists
        }
        User user = new User();
        user.setUsername(email);
        user.setEmail(email);
        user.setPassword(password); // In real apps, hash the password!
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole("CUSTOMER");
        user.setCreatedAt(OffsetDateTime.now());
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
