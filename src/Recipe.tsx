import {View, Text, ImageBackground, ActivityIndicator, ScrollView, Pressable} from "react-native";
import { getMealByID } from "./fetch";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";
import { MaterialIcons} from "@expo/vector-icons";


type RecipeInputProps = NativeStackScreenProps<RootStackParamList, "Recipe">
const Recipe : React.FC<RecipeInputProps> = ({route}) => {
    //<MaterialIcons name = "favourite" size = {24} color = "gray" />
    const [recipeInfo, setRecipeInfo] = useState();
    const [displayInfo, setDisplayInfo] = useState();
    const [favoritePress, setFavoritePress] = useState(false);
    const {ID} = route.params;
    useEffect(() => {
        getMealByID(process.env.EXPO_PUBLIC_RECIPE_LOOKUP_LINK + "?i=" + ID || "", setRecipeInfo);
    },[])
    
    const handleFavoritePress = () => {
      setFavoritePress(!favoritePress);
    }
    useEffect(() => {
        if(recipeInfo) {
            const ingredientsArr = [];
            for(let i = 0; i < 20; i++) {
                const ingredient = recipeInfo["meals"][0][`strIngredient${i + 1}`]?.trim();
                const measurement = recipeInfo["meals"][0][`strMeasure${i + 1}`]?.trim();
                if(ingredient !== "" && ingredient !== null) {
                    ingredientsArr.push({ingredient : ingredient, measurement : measurement});
                }
           }
            const newItem = {
                name : recipeInfo["meals"][0]["strMeal"],
                category : recipeInfo["meals"][0]["strCategory"],
                area : recipeInfo["meals"][0]["strArea"],
                instruction : recipeInfo["meals"][0]["strInstructions"],
                image : recipeInfo["meals"][0]["strMealThumb"],
                tags : recipeInfo["meals"][0]["strTags"],
                ingredients : ingredientsArr,
            };
            setDisplayInfo(newItem);
        }
    }, [recipeInfo])

    return (
        <>
            {displayInfo && displayInfo.image ? (
                <View>
                    
                    <ImageBackground source = {{uri : displayInfo.image}} className="
                    h-full 
                    w-full
                    flex
                    justify-end"
                    resizeMode="cover">
                      
                        <View className="rounded-t-3xl 
                        bg-white flex-1">
                            <View>
                               <View className =" ml-8 mt-8">
                                <Text className = "font-semibold text-xl">
                                Click the heart to add to favorites!
                                </Text>
                               <Pressable className = "flex justify-center items-center w-10 h-9"
                                onPress={handleFavoritePress}>
                                    {favoritePress === false ? (
                                      <MaterialIcons name = "favorite-border" size = {36} color = "red" />
                                    ) : (
                                      <MaterialIcons name = "favorite" size = {36} color = "red" />
                                    )}
                                </Pressable>

                               </View>

                               <View className="ml-8 mt-8">
                                    <View className="mt-2 space-y-2">
                                        <Text className="font-semibold text-3xl">{displayInfo.name}</Text>
                                        <Text className="text-xl text-gray-500">Tags: {displayInfo.tags}</Text>
                                        <Text className="text-xl text-gray-500">Category: {displayInfo.category}</Text>
                                        <Text className="text-xl text-gray-500">Cuisine: {displayInfo.area}</Text>
                                    </View>
                               </View>

                               <View className="ml-8 mt-4">
                                    <Text className="font-semibold text-3xl">Ingredients:</Text>
                                    <ScrollView horizontal = {true}>
                                        {displayInfo.ingredients.map((data : any,index : number) =>
                                            <View className="mt-2 flex mr-4 border-black border-2
                                            rounded-xl w-36 p-2 justify-center items-center" key = {index}>
                                                <Text>{data.ingredient}</Text>
                                                <Text>{data.measurement}</Text>
                                            </View> 
                                        )}
                                    </ScrollView>
                               </View>

                               <View className="ml-8 grow mr-8 h-96">
                                    <Text className="font-semibold text-3xl">Instructions:</Text>
                                    <ScrollView>
                                        <Text>{displayInfo.instruction}</Text>
                                    </ScrollView>
                               </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            ) : (
                <View className="flex justify-center items-center h-full">
                    <ActivityIndicator size="large" />
                </View>
           )} 
        </>
    );
}



export default Recipe;
