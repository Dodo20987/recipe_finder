package com.Application.backend.controller;

import com.Application.backend.Repo.FavouriteRepo;
import com.Application.backend.models.Favourite;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FavouriteController {
    @Autowired
    private FavouriteRepo favouriteRepo;
    /*
    @GetMapping("/favourite/{id}")
    public Optional<List<Favourite>> getFavourite(@RequestBody long id) {
        return favouriteRepo.findByUserID(id);
    }

    @PostMapping("/favourite/save")
    public int saveFavourite(@RequestBody Favourite favourite) {
        favouriteRepo.save(favourite);
        return 201;
    }
    */
    /*
    @DeleteMapping("/favourite/delete")
    public int deleteFavourite(@RequestBody long userID, @RequestBody long recipeID) {
        try {
            Favourite favourite = favouriteRepo.findByUserIDAndRecipeID(userID, recipeID);
            if(favourite == null) {
               throw new EntityNotFoundException("Combination of user and recipe not found");
            }
            favouriteRepo.delete(favourite);
            return 204;
        }
        catch(EntityNotFoundException e) {
            return 404;
        }
    }
*/
}
