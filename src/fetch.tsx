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
export const getData = async (link : string, setData : React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await axios.get(link, {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
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
    try {
        const params = {
            "name": userObj.name,
            "password": userObj.password,
            ...(userObj.email !== undefined && { email: userObj.email })
        };
        const response = await axios.post(link,params,{
            headers : {
                "Content-Type" : "application/json"
            }
        });

        //console.log("account registered sucessfully: ", response.data);
        return response.data;
    }
    catch(error) {
        console.error("there was an error with the fetch operation", error)
    }
}
export const testFunc = async () => {
    console.log("testing");
    try {
        const response = await axios.get("http://10.0.0.86:8080/");
        console.log("data : ",response.data);
    }
    catch(error) {
        console.error(error);
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
        const response = await axios.post(link,params,
         {
            headers : {
                "Content-Type" : "application/json"
            }
        })

        if(response.data === 200) {
            setSuccess(true);
            console.log("login successful");
            return true;
        }
        console.log("login failed");
        setSuccess(false)
        return false;
    }
    catch(error) {
        console.error("There was a problem with the fetch operation");
        console.log("login failed");
        setSuccess(false);
        throw error;
    }
}