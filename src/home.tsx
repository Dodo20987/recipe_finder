import {Text, View, TextInput, Pressable,ScrollView} from 'react-native';
import { useState, useEffect, useRef, React} from 'react';
import { getCategories, getData, getRandomRecipe, storeUserData, getUserData } from './fetch';
import DisplaySearchResults from './DisplaySearchResults';
import DisplayRandom from './DisplayRandom';
import { MealItem } from './types';
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const Home: React.FC  = () => {
    const [displayCategory, setDisplayCategory] = useState<JSX.Element[]>([]);
    const [categoryInfo, setCategoryInfo] = useState();
    const [category, setCategory] = useState<string>();
    const [recipeName, setRecipeName] = useState<string>("");
    const [searchResults, setSearchResults] = useState([]);
    const [displayResults, setDisplayResults] = useState<MealItem[]>([]);
    const [userName, setUserName] = useState<string>("");
    const recipeRef = useRef(recipeName);

    useEffect(() => {
        console.log(recipeName);
        recipeRef.current = recipeName;
    },[recipeName])

    const handleSearch = () => {
        // Make sure to empty search results before searching for new results
        setDisplayResults([]);
        console.log("searching...");
        const link = process.env.EXPO_PUBLIC_RECIPE_SEARCH_LINK + "?s=" + recipeRef.current;
        console.log(link);
        getData(link,setSearchResults);
    }
    
    const handleCategory = (text: string) => {
        if(category === text)
            setCategory("");
        else
            setCategory(text)
    }
    useEffect(() => {
        if(searchResults["meals"]) {
            const len = searchResults["meals"].length;
            for (let i = 0; i < len; i++) {
                const newItem: MealItem = {
                    image : searchResults["meals"][i]["strMealThumb"],
                    ID : searchResults["meals"][i]["idMeal"],
                    name : searchResults["meals"][i]["strMeal"],
                    area : searchResults["meals"][i]["strArea"]
                }
                setDisplayResults((prevItem : any) => [...prevItem, newItem]);
            }
        }
    },[searchResults])

    useEffect(() => {
        const getToken = async () => {
          const result = await SecureStore.getItemAsync("jwt");
          if(result) {
            // username is decoded.sub
            console.log("Your jwt token is: ", result);
            const decoded = jwtDecode(result);
            console.log("name: ", decoded.sub);
            const link = process.env.EXPO_PUBLIC_API_BASE + "/user?username=" + decoded.sub;
            storeUserData(link,decoded.sub,result);             
            //const userData = await getUserData();
            setUserName(decoded.sub);
          }
          else {
            console.log("No values stored under the key 'jwt'");
          }
        }
        getToken();
        getCategories(process.env.EXPO_PUBLIC_CATEGORY_LINK || "", setCategoryInfo);
    },[])
   

    useEffect(() => {
        if(categoryInfo) {
            const tempCategory = categoryInfo["meals"].map((item : any, index : number) => 
                    <Pressable key = {index} 
                    onPress={() => handleCategory(item.strCategory)}
                    className={`border-2 border-orange-400 rounded-3xl p-2 mr-4 w-28 items-center active:bg-blue-400 ${category === item.strCategory ? 'bg-blue-500' : 'bg-transparent'}`}>
                        <Text className='text-lg'>
                            {item.strCategory}
                        </Text>
                    </Pressable>
            );
            setDisplayCategory(tempCategory);
        }
    }, [categoryInfo, category])
    return ( <>
            <View className='flex'>
                <View className='border-black 
                m-4'>
                    <Text className='text-2xl font-bold'>
                        Hi, {userName} 
                    </Text>
                </View>
                <View className='m-4'>
                    <Text className='text-orange-600 text-3xl'>
                        What would you like {'\n'}to cook today? {'\n'}
                    </Text>

                    <View className='flex flex-row'>
                        <TextInput
                            value={recipeName}
                            className='border-black border-2 w-4/5 rounded-full h-14 p-4 mb-2
                            bg-red-300 mr-8'
                            placeholder='Search Recipes...'
                            onChangeText={setRecipeName}
                        />
                        <Pressable className='
                        border-black
                        border-2
                        rounded-full 
                        w-14
                        h-14
                        justify-center
                        items-center
                        bg-red-300
                        active:bg-blue-400'
                        onPress={handleSearch}>
                            <Text>
                                &#x1F50D;
                            </Text>
                        </Pressable> 
                    </View>
                </View>

                <View>
                    <Text className='m-4 text-2xl'>
                        Filter by categories:
                    </Text>

                    <ScrollView horizontal = {true}
                    className='ml-4 mt-3 flex flex-row'>                   
                       {displayCategory}
                    </ScrollView>
                </View>
                {displayResults.length === 0 ? (
                    <View>
                        <Text className='m-4 text-2xl'>
                            Explore:
                        </Text>
                        <View className='flex flex-row'>
                                <DisplayRandom />
                        </View>
                    </View>
                ) : (
                    <View> 
                        <Text className='m-4 text-2xl'>
                            Results:
                        </Text>
                        <View className='flex flex-row'>
                            <DisplaySearchResults displayResults = {displayResults}/>
                        </View>
                    </View>

                )} 
            </View>
            </>
    );
}

export default Home;
