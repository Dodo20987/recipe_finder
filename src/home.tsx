import {Text, View, TextInput, Pressable,ScrollView} from 'react-native';
import { useState, useEffect} from 'react';
import Filter from './Filter';
import {getRandomRecipe} from "./fetch"
import { getCategories } from './fetch';
import DisplayRandom from './DisplayRandom';
const Home: React.FC  = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [displayCategory, setDisplayCategory] = useState<JSX.Element[]>([]);
    const [categoryInfo, setCategoryInfo] = useState<any>();
    const [category, setCategory] = useState<string>();

    const handleCategory = (text: string) => {
        if(category === text)
            setCategory("");
        else
            setCategory(text)
    }

    const handleFilterVisible = () => {
        setFilterVisible(!filterVisible);
    }

    useEffect(() => {
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
            {/*<Filter filterVisible = {filterVisible} setFilterVisible={setFilterVisible}/> */}
            <View className='flex'>
                <View className='border-black 
                m-4'>
                    <Text className='text-2xl font-bold'>
                        Hi, UserName
                    </Text>
                </View>
                <View className='m-4'>
                    <Text className='text-orange-600 text-3xl'>
                        What would you like {'\n'}to cook today? {'\n'}
                    </Text>

                    <View className='flex flex-row'>
                        <TextInput
                            className='border-black border-2 w-4/5 rounded-full h-14 p-4 mb-2
                            bg-red-300 mr-8'
                            placeholder='Search Recipes...'
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
                        onPress={handleFilterVisible}>
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

                <Text className='m-4 text-2xl'>
                    Explore:
                </Text>
                <View className='flex flex-row'>
                    
                        <DisplayRandom />
                    
                </View>
            </View>
            </>
    );
}

export default Home;