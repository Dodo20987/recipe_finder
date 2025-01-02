package com.Application.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// the following model copies the format given by the api
@Entity
@Table(name = "RECIPES")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMeal;

    public long getIdMeal() {return idMeal;}
    public void setIdMeal(long idMeal) {this.idMeal = idMeal;}
    @NotBlank(message = "recipe name is required")
    private String strMeal;

    public String getStrMeal() {return strMeal;}
    public void setStrMeal(String strMeal) {this.strMeal = strMeal;}

    @Size(min = 3)
    private String strCategory;

    public String getStrCategory() {
        return strCategory;
    }
    public void setStrCategory(String strCategory) {this.strCategory = strCategory;}

    @Size(min = 3)
    private String strArea;

    public String getStrArea() {return strArea;}
    public void setStrArea(String strArea) {this.strArea = strArea;}

    @Size(min = 50)
    private String strInstructions;
    public String getStrInstructions() {return strInstructions;}
    public void setStrInstructions(String strInstructions)  {this.strInstructions = strInstructions;}

    @NotBlank(message = "Image of meal is required")
    private String strMealThumb;

    public String getStrMealThumb() {return strMealThumb;}
    public void setStrMealThumb(String strMealThumb) {this.strMealThumb = strMealThumb;}

    private String strTags;

    public String getStrTags() {return strTags;}
    public void setStrTags(String strTags) {this.strTags = strTags;}
}
