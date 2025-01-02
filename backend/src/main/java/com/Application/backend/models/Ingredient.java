package com.Application.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "INGREDIENTS")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ingredientID;

    public long getIngredientID() {return ingredientID;}
    public void setIngredientID(long ingredientID) {this.ingredientID = ingredientID;}

    @Size(min = 3)
    @NotBlank(message = "Ingredient name is required")
    private String ingredientName;

   public String getIngredientName() {
       return ingredientName;
   }

   public void setIngredientName(String ingredientName) {
       this.ingredientName = ingredientName;
   }
}
