package com.Application.backend.models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
@Embeddable
public class CompositeID implements Serializable {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompositeID that = (CompositeID) o;
        return Objects.equals(recipeID, that.recipeID) && Objects.equals(userID, that.userID);
    }
    @Override
    public int hashCode() {
        return Objects.hash(recipeID, userID);
    }
}
