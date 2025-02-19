import {View, FlatList, Text, Pressable} from "react-native"
import {getFavourites, removeFavourite} from "./fetch";
import {Favourites} from "./types";
import { useState, useEffect, React } from "react";

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

const Favourite = () => {
  
  const [favouriteList, setFavouriteList] = useState<Favourites[]>([]);
  const [token, setToken] = useState<string>("");
  const [userID, setUserID] = useState<number>(0);
  useEffect(() => {
    const getToken = async () => {
      const result = await SecureStore.getItemAsync("jwt");
      if(result) {
        // username is decoded.sub
        // structure of decoded is as follows:
        // {sub : username }
        console.log("Your jwt token is: ", result);
        const decoded = jwtDecode(result);
        console.log("info returned: ", decoded);
        console.log("name: ", decoded.sub);

        //const link = process.env.EXPO_PUBLIC_API_BASE + "/user?username=" + decoded.sub;
        //const userData = await getUserData();
        setToken(result);
      }
      else {
        console.log("No values stored under the key 'jwt'");
      }
    }
    getToken();
    getFavouriteList(token);
  },[])
  
  const getFavouriteList = (token : string) => {
    // TODO: must append the userID to the link
    const link = process.env.EXPO_PUBLIC_API_BASE + "/Favourite" + ``
    getFavourites(link, token, setFavouriteList)
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
