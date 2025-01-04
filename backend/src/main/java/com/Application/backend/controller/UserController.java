package com.Application.backend.controller;

import com.Application.backend.DTO.LoginRequest;
import com.Application.backend.Repo.UserRepo;
import com.Application.backend.models.User;
import com.Application.backend.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://10.0.0.86:8081")
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public String getPage(Principal principal) {
        return "Testing hello, " + principal.getName();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/user")
    public Optional<User> getUser(@RequestParam String username) {
        System.out.println("getting user info: ");
        System.out.println(username);
        return userRepo.findByUsername(username);
    }

    // registers a new user, and saves the hash of the password to the database
    @PostMapping("/save")
    public Integer saveUser(@RequestBody User user) {
        System.out.println("request received from: ");
        System.out.println(user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return 201;
    }

    @PutMapping("/update/{id}")
    public Integer updateUser(@PathVariable long id, @RequestBody User user) {
        try {

            User updatedUser = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
            if(user.getUsername() != null && !user.getUsername().isEmpty())
                updatedUser.setUsername(user.getUsername());

            if(user.getPassword() != null && !user.getPassword().isEmpty())
                updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));

            if(user.getEmail() != null && !user.getEmail().isEmpty() )
                updatedUser.setEmail(user.getEmail());

            userRepo.save(updatedUser);
            return 204;
        }
        catch(EntityNotFoundException e) {
            return 404;
        }
    }

    @DeleteMapping("/delete/{id}")
    public Integer deleteUser(@PathVariable long id) {
        try {
            User foundUser = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
            userRepo.delete(foundUser);
            return 204;
        }
        catch(EntityNotFoundException e) {
            return 404;
        }
    }
}
