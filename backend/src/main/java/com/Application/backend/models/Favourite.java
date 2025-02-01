package com.Application.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

// this table will have a many to many relationship with users table
@Entity
@Table(name = "FAVOURITES")
public class Favourite {
    @EmbeddedId
    private CompositeID id;
    public CompositeID getID() {return id;}
    public void setID(CompositeID id) {this.id = id;}

    @NotBlank(message = "username is required")
    private String username;

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = this.username;}

}
