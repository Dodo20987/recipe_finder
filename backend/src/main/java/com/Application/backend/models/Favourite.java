package com.Application.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

// this table will have a many to many relationship with users table
@Entity
@Table(name = "FAVOURITES")
public class Favourite {
    public Favourite() {}

    // Constructor that accepts recipeID and userID
    public Favourite(long recipeID, long userID) {
        this.id = new CompositeID(recipeID, userID);
    }

    @EmbeddedId
    private CompositeID id;
    public CompositeID getID() {return id;}
    public void setID(CompositeID id) {this.id = id;}

    @Override
    public String toString() {
        return "Favourite{id=" + id + "}";
    }
}
