package com.Application.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// this table will have a many to many relationship with users table
@Entity
@Table(name = "FAVOURITES")
public class Favourite {

    @EmbeddedId
    private CompositeID id;

    public CompositeID getID() {return id;}
    public void setID(CompositeID id) {this.id = id;}

    @NotBlank(message = "recipe name is required")
    private String name;

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

}
