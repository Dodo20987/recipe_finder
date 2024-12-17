package com.Application.backend.service;

import com.Application.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Application.backend.Repo.UserRepo;
@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public boolean authenticate(String name, String password) {
        // Add in logic to see if user with particular password and name is found
        User user = userRepo.findByName(name).orElse(null);
        // user not found
        if(user == null)
        {
            return false;
        }
        // check input password, and the password stored in the database
        if(!passwordEncoder.matches(password, user.getPassword())) {
            return false;
        }

        return true;
    }
}
