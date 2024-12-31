package com.Application.backend.Repo;

import com.Application.backend.models.CompositeID;
import com.Application.backend.models.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
public interface FavouriteRepo extends JpaRepository<Favourite, CompositeID> {
    //public Optional<List<Favourite>> findByUserID(long userID);
    //public Favourite findByUserIDAndRecipeID(long userID, long recipeID);
}
