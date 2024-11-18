import {API_KEY, API_HOST} from "@env";
import axios from "axios";
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
