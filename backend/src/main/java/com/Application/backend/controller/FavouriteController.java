package com.Application.backend.controller;

import com.Application.backend.Repo.FavouriteRepo;
import com.Application.backend.models.Favourite;
import com.nimbusds.jose.crypto.opts.OptionUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
public class FavouriteController {
    @Autowired
    private FavouriteRepo favouriteRepo;


    //lists the favourite recipes for a particular user
    @GetMapping("/favourites/{id}")
    public ResponseEntity<Optional<List<Favourite>>> getFavourites(@PathVariable long id) {
        try {
            Optional<List<Favourite>> temp = favouriteRepo.findById_UserID(id);
            if(temp.isEmpty()) {
                throw new EntityNotFoundException("User not found");
            }
            return ResponseEntity.ok(temp);
        }
        catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }


    // list the favourite recipes for a particular user, using the username
    public ResponseEntity<Optional<List<Favourite>>> getFavouritesWithUsername(@RequestBody String username) {
        try {
            Optional<List<Favourite>> temp = favouriteRepo.findByUsername(username);
            if(temp.isEmpty()) {
                throw new EntityNotFoundException(String.format("user with name: %s not found", username));
            }
            return ResponseEntity.ok(temp);
        }
        catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }


    // lists a single favourite recipe for a user
    @GetMapping("/favourite")
    public ResponseEntity<Optional<Favourite>> getFavourite(@RequestBody Favourite favourite) {
        try {
            long recipeID = favourite.getID().getRecipeID();
            long userID = favourite.getID().getUserID();
            Optional<Favourite> temp = favouriteRepo.findById_UserIDAndId_RecipeID(userID, recipeID);
            if (temp.isEmpty()) {
                throw new EntityNotFoundException("Combination userID and recipeID not found");
            }
            return ResponseEntity.ok(temp);
        }
        catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }
    // saves associated favourite to user's account
    @PostMapping("/favourite/save")
    public int saveFavourite(@RequestBody Favourite favourite) {
        favouriteRepo.save(favourite);
        return 201;
    }

    @DeleteMapping("/favourite/delete")
    public int deleteFavourite(@RequestBody long userID, @RequestBody long recipeID) {
        try {
            Optional<Favourite> favourite = favouriteRepo.findById_UserIDAndId_RecipeID(userID, recipeID);
            if(favourite.isEmpty()) {
               throw new EntityNotFoundException("Combination of user and recipe not found");
            }
            favouriteRepo.delete(favourite.get());
            return 204;
        }
        catch(EntityNotFoundException e) {
            return 404;
        }
    }
}
