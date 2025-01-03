import {API_KEY, API_HOST} from "@env";
import axios from "axios";

import {Favourite, User, loginRequest} from "./types"
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
                "Accept" : "application/json"
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
    try {
        const params = {
            "username": userObj.name,
            "password": userObj.password,
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
        const params = {
            name : loginObj.name,
            password : loginObj.password
        };
        console.log(link);

        const encodedCredentials = btoa(`${loginObj.name}:${loginObj.password}`);
        
        const response = await axios.post(link,null,
         {
            headers : {
                "Authorization" : `Basic ${encodedCredentials}`
            }
        })

        setSuccess(true);
        console.log("login successful");
        console.log(response.data);
        return true;
        
    }
    catch(error) {
        console.error("There was a problem with the fetch operation", error);
        console.log("login failed");
        setSuccess(false);
        throw error;
    }
}


