import { useState, useEffect } from "react";
import { Pressable, Text, View, Image,ScrollView } from "react-native";
import { getRandomRecipe } from "./fetch";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "./types";
type navigationProps = NativeStackNavigationProp<RootStackParamList>;

const DisplayRandom = () => {
    const navigation = useNavigation<navigationProps>();
    const [recipes, setRecipies] = useState<any[]>([]);
    const [shallowInfo, setShallowInfo] = useState<any[]>([]);
    useEffect(() => {
        for (let i = 0; i < 10; i++) {
            getRandomRecipe(process.env.EXPO_PUBLIC_RANDOM_RECIPE_LINK || "", setRecipies);
        }
    },[])
    useEffect(() => {
        //console.log("recipes: ", recipes[0]["meals"][0]["strMealThumb"]);
        if(recipes.length === 10) {
            for(let i = 0; i < 10; i++) {
                const newItem = {
                    image : recipes[i]["meals"][0]["strMealThumb"],
                    name : recipes[i]["meals"][0]["strMeal"],
                    area : recipes[i]["meals"][0]["strArea"],
                    ID : recipes[i]["meals"][0]["idMeal"]
                };
                setShallowInfo((prevItem : any) => [...prevItem,newItem])
            }
        }
    },[recipes])
    return (
        <View>
            {shallowInfo.length === 0 ? (
            <Text>No images to display</Text>
            ) : (
                <ScrollView
                horizontal = {true}
                className="mt-4">
            {shallowInfo.map((data, index) => (
                <View key={index}>
                    <Pressable
                    onPress = {() => navigation.navigate("Recipe", {ID : data.ID})}>
                        <Image
                            source={{ uri: data.image }}
                            className="h-36 w-36 rounded-3xl ml-2 mr-2
                            border-2 border-black"
                        />
                    </Pressable>
                    <Text className="flex flex-wrap w-36 text-center">
                        {data.name}
                    </Text>
                </View>
            ))}
            </ScrollView>
            )}
            
        </View>
    );
}


export default DisplayRandom;