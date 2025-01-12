import {API_KEY} from "@env";
import axios from "axios";
import {Favourite, User, loginRequest, MealItem, UserUpdateRequest} from "./types"
import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getMealByID = async (link: string, setRecipeInfo : React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await axios.get(link, {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        });
        const data = response.data;
        setRecipeInfo(data);

    }
    catch(err) {
        console.error("There was an issue with the fetch operation: ", err);
    }
}

export const getMealByName = async (link : string, name : string) => {
    try {
        const response = await axios.get(link, {
            params : {
                s : name
            } ,
            headers : {
                "Content-Type" : "applcation/json",
                "Accept" : "application/json"
            }
        });

        const data = response.data;
    }
    catch (error) {
        console.error("There was an error with the fetch operation", error); 
    
    }
}
export const getCategories = async (link: string, setCategoryInfo: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await axios.get(link, {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        });
        const data = response.data;
        setCategoryInfo(data);

    }
    catch(err) {
        console.error("There was an issue with the fetch operation: ", err);
    }
}

export const getArea = async (link: string, setAreaInfo: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await axios.get(link, {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        });
        const data = response.data;
        setAreaInfo(data);
    } 
    catch(err) {
        console.error("There was an error with the fetch operation: ", err);
    }
}

// a general fetch function for get requests
// this function will be for api calls that require authentication
export const getData = async (link : string, setData : React.Dispatch<React.SetStateAction<any>>, jwtToken : string) => {
    try {
        const response = await axios.get(link, {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${jwtToken}`
            }
        });
        const data = response.data;
        setData(data);
    }
    catch(error) {
        console.error("There was an error with the fetch operation", error);
    }

}

export const getRandomRecipe = async (link : string, setData : React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await axios.get(link, {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        });
        const data = response.data;
        setData((prevItem : any) =>[...prevItem, data]);
    }
    catch(error) {
        console.error("There was an error with the fetch operation", error);
    }

}

export const registerAccount = async (link : string, userObj : User) => {
    console.log("account register entered");
    console.log(link);
    console.log(userObj);
    try {
        const params = {
            username: userObj.username,
            password: userObj.password,
            ...(userObj.email !== undefined && { email: userObj.email })
        };
        console.log(params);
        const response = await axios.post(link,params,{
            headers : {
                "Content-Type" : "application/json"
            }
        });

        console.log("account registered sucessfully: ", response.data);
        return response.data;
    }
    catch(error) {
        console.error("there was an error with the fetch operation", error)
    }
}

export const saveToFavourites = async (link : string, favouriteObj : Favourite) => {
    try {
        const response = await axios.post(link,{
            "name" : favouriteObj.name,
            "userID" : favouriteObj.userID,
            "recipeID" : favouriteObj.recipeID 
        }, {
            headers : {
                "Content-Type" : "application/json"
            }
        })

        console.log("recipe sucessfully saved: ", response.data);
        return response.data;

    }
    catch(error) {
        console.error("There was a problem with the fetch operation", error);
    }
}

export const login = async (link: string, loginObj : loginRequest, setSuccess : React.Dispatch<React.SetStateAction<any>>) => {
    try {
        
        const encodedCredentials = btoa(`${loginObj.name}:${loginObj.password}`);
        
        const response = await axios.post(link,null,
         {
            headers : {
                "Authorization" : `Basic ${encodedCredentials}`
            }
        })

        setSuccess(true);
        await SecureStore.setItemAsync("jwt", response.data);
        console.log("login successful");
        return true;
        
    }
    catch(error) {
        console.error("There was a problem with the fetch operation", error);
        console.log("login failed");
        setSuccess(false);
        throw error;
    }
}

export const storeUserData = async (link : string, username : string, token : string) => {
  
  console.log("storing data");
  console.log(link);
  console.log(username);
  try {
    const response = await axios.get(link,
      {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
    await AsyncStorage.setItem("user",JSON.stringify(response.data));

  }
  catch(error) {
    console.error("There was an error with the fetch operation", error);
  }
}

export const updateUserData =  async(link : string, userObj : UserUpdateRequest, token : string) => {
  console.log("updating user data");
  console.log(link);
  try {
    
    // all optional fields so that, when the user wants to update their information
    // they are not requried to update every single piece of information in their account
    const params = {
      ...(userObj.username !== undefined && {username: userObj.username}),
      ...(userObj.password !== undefined && {password: userObj.password}),
      ...(userObj.email !== undefined && { email: userObj.email })
    };
    
    const response = await axios.put(link, params, {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
    console.log("user information has successfully been updated");
    return true;
  }
  catch (error) {
    console.error("There was an error with the fetch operation: ", error);
    return false;
  }
}
export const deleteUser = async(link : string, token : string) => {
  try {
    const response = await axios.delete(link, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });
    console.log("User has been successfully deleted");
    return true;
  }
  catch(error) {
    console.error("There was an error with the fetch operation", error);
    return false;
  }
}

export const getUserData = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("user");
    
    console.log("userInfo: ", userInfo);
    // returns a json obj with id, username, and password fields
    return userInfo != null ? JSON.parse(userInfo) : null;
  }
  catch(error) {
    console.error("There was an error with getting user data from AsyncStorage", error);
  }
}

export const logout = async () => {
  console.log("logging out");
  try {
    // removing username from async storage
    await AsyncStorage.removeItem("user");
    // remvoing the jwtToken from SecureStore
    await SecureStore.deleteItemAsync("jwt");
    
    console.log("sucessfully logged out");
  }
  catch (error) {
    console.error("error", error);
  }
}

export const getToken = async() => {
  console.log("getting token");
  const result = await SecureStore.getItemAsync("jwt");
  if (result) {
    // retuns a promise therefore function must be called in an async await wrapper
    console.log("got token");
    return result;
  }
  else {
    console.log("there is no jwt token");
  }
}
