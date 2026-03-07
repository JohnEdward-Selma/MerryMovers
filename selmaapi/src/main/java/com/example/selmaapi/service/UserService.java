package com.example.selmaapi.service;

import com.example.selmaapi.entity.User;
import com.example.selmaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByUsername(username) != null || userRepository.findByEmail(email) != null) {
            return null; // Username or email already exists
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // In real apps, hash the password!
        return userRepository.save(user);
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
