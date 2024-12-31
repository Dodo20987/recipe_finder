package com.Application.backend.controller;

import com.Application.backend.DTO.LoginRequest;
import com.Application.backend.Repo.UserRepo;
import com.Application.backend.models.User;
import com.Application.backend.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public String getPage() {
        return "test";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    // registers a new user, and saves the hash of the password to the database
    @PostMapping("/save")
    public Integer saveUser(@RequestBody User user) {
        System.out.println("request received");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return 201;
    }

    // logging in a user
    @PostMapping("/login")
    public Integer loginUser(@RequestBody LoginRequest request) {
        try {
            boolean isFound = authService.authenticate(request.getName(), request.getPassword());
            if(!isFound) {
                throw new EntityNotFoundException("Incorrect password or username/email entered");
            }
            return 200;

        }
        catch(EntityNotFoundException e) {
           return 401;
        }
    }

    @PutMapping("/update/{id}")
    public Integer updateUser(@PathVariable long id, @RequestBody User user) {
        try {

            User updatedUser = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
            if(user.getName() != null && !user.getName().isEmpty())
                updatedUser.setName(user.getName());

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
