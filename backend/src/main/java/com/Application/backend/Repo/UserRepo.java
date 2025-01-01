package com.Application.backend.Repo;

import com.Application.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
}
