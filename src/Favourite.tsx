import {View, FlatList, Text, Pressable} from "react-native"
import {React, useState, useEffect} from "react";
import {getFavourites, getToken, removeFavourite} from "./fetch";
import {Favourite} from "./types";

const renderFavouriteList = (favourites) => {
  if (favourites.length === 0) {
    return null;
  }
  else {
    // TODO: Make FlatList render the contents of favourites i.e. image, ingredients, etc...
    return (
      <FlatList 

      />
    );
  }
}

const Favourite = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([])
  const [token, setToken] = useState<string>("");
  const getFavouriteList = (token : string) => {
    const link = process.env.EXPO_PUBLIC_API_BASE + "/Favourite";
    
    getFavourites(link, token, setFavourites);
  }

  const handleRemoveFavourite = () => {
    const link = process.env.EXPO_PUBLIC_API_BASE = "/removeFavourite";
    removeFavourite(link, token);
  }

  // in order to re render the page if one of the favourites gets deleted
  useEffect(() => {
    getFavouriteList(token);
  },[favourites])

  useEffect(() => {
    const getJWT = async() => {
      setToken(await getToken());
      console.log("token: ", token);
    }
    getJWT();
    getFavouriteList(token);
    
  },[])
  return <View className = "flex flex-row">
    <Text className = "text-orange-600 text-3xl">
      Favourite Recipes:
    </Text>
    {renderFavouriteList(favourites)}
  </View>
}

export default Favourite;
