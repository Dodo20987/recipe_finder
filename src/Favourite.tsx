import {View, FlatList, Text, Pressable} from "react-native"
import {getFavourites, removeFavourite, getUserID} from "./fetch";
import {Favourites, userDetail} from "./types";
import { useState, useEffect, React } from "react";
import * as SecureStore from "expo-secure-store";

/*
const renderFavouriteList = (favouriteList) => {
  if (favouriteList.length === 0) {
    return null;
  }
  else {
    // TODO: Make FlatList render the contents of favourites i.e. image, ingredients, etc...
    return (
      <FlatList 

      />
    )
  }
}
*/

const Favourite = () => {
  const [favouriteList, setFavouriteList] = useState<Favourites[]>([]);
  const [token, setToken] = useState<string>("");
  const [userID, setUserID] = useState<number>(0);

  useEffect(() => {
    const getToken = async () => {
      const result = await SecureStore.getItemAsync("jwt");
      setToken(result);
    }
    getUserID(setUserID);
    getToken();
  },[])

  useEffect(() => {
    if(token !== "" && userID !== 0 && userID !== undefined) {

      /*
      console.log("user info: ", userInfo);
      console.log("user id: ", userInfo.id);
      console.log("id : " ,userInfo["id"]);
       */
      console.log("userID: ", userID);
      console.log("token: ", token);
      getFavouriteList(token);
    }
  },[token, userID])

  useEffect(() => {
    if(favouriteList.length > 0) {
      console.log("Favourite List: ", favouriteList);
    }
  },[favouriteList])
  
  //TODO: get the favourite list and displat it onto the screen
  const getFavouriteList = (token : string) => {
    //console.log("userID: ", userInfo.id);
    //console.log("token: ", token);
    //const link = process.env.EXPO_PUBLIC_API_BASE + "/Favourite" + `${userID}`
    //getFavourites(link, token, setFavouriteList)
  }

  /*const handleRemoveFavourite = (token : string) => {
    const link = process.env.EXPO_PUBLIC_API_BASE + "/favourite/delete";
    removeFavourite(link, token);
  }*/

  // in order to re render the page if one of the favourites gets deleted
  /*
  useEffect(() => {
    console.log("Hello world");
    getFavouriteList(token);
  },[favourites])
  */
  return <View className = "flex flex-row">
    <Text className = "text-orange-600 text-3xl">
      Favourite Recipes:
    </Text>
  </View>
}

export default Favourite;
