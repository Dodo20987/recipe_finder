package com.Application.backend.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class CompositeID {
    private long recipeID;
    private long userID;

    CompositeID() {}

    CompositeID(long recipeID, long userID) {
        this.recipeID = recipeID;
        this.userID = userID;
    }

    public long getUserID() {return userID;}
    public long getRecipeID() {return recipeID;}

    public void setUserID(long userID) {this.userID = userID;}
    public void setRecipeID(long recipeID) {this.recipeID = recipeID;}


}
