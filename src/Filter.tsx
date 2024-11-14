import {Text, View, Modal, Alert, Pressable, TextInput, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { getCategories, getArea } from './fetch';
interface FilterProps {
    filterVisible : boolean, 
    setFilterVisible: (visible : boolean) => void
}

const Filter: React.FC<FilterProps> = ({filterVisible, setFilterVisible}) => {
    const handleFilterVisible = () => {
        setFilterVisible(!filterVisible);
    }
    const [displayCategory, setDisplayCategory] = useState<JSX.Element[]>([]);
    const [displayArea, setDisplayArea] = useState<JSX.Element[]>([]);
    const [categoryInfo, setCategoryInfo] = useState<any>();
    const [category, setCategory] = useState<string>();
    const [area, setArea] = useState<string>("");
    const [areaInfo, setAreaInfo] = useState<any>();
    const [mainIngredient, setMainIngredient] = useState<string>("");
    const handleMainIngredient = (text : string) => {
        setMainIngredient(text);

    }
    const handleCategory = (text : string) =>{
        if(category === text)
            setCategory("");
        else
            setCategory(text);
    }

    const handleArea = (text : string) => {
        if(area === text)
            setArea("");
        else
            setArea(text);
    }

    useEffect(() => {
        getCategories(process.env.EXPO_PUBLIC_CATEGORY_LINK || "", setCategoryInfo);
        getArea(process.env.EXPO_PUBLIC_AREA_LINK || "", setAreaInfo);
    },[]) 
    
    useEffect(() => {
        if(categoryInfo && areaInfo) {
            const tempCategory = categoryInfo["meals"].map((item : any, index : number) => 
                    <Pressable key = {index} 
                    onPress={() => handleCategory(item.strCategory)}
                    className={`border-2 border-orange-400 rounded-3xl p-2 mr-4 w-28 items-center active:bg-blue-400 ${category === item.strCategory ? 'bg-blue-500' : 'bg-transparent'}`}>
                        <Text className='text-lg'>
                            {item.strCategory}
                        </Text>
                    </Pressable>
            )
            const tempArea = areaInfo["meals"].map((item : any, index : number) => 
                    <Pressable key = {index} 
                    onPress={() => handleArea(item.strArea)}
                    className={`border-2 border-orange-400 rounded-3xl p-2 mr-4 w-28 items-center active:bg-blue-400 ${area === item.strArea ? 'bg-blue-500' : 'bg-transparent'}`}>
                        <Text className='text-lg'>
                            {item.strArea}
                        </Text>
                    </Pressable>
            )
            setDisplayCategory(tempCategory);
            setDisplayArea(tempArea);
        }
    },[categoryInfo, category, area, areaInfo])

    useEffect(() => {
        if(category != "" && category != undefined) {
            //console.log("category: ",category);
        }
    },[category])
    return (
    <Modal 
            animationType="slide"
            transparent={true}
            visible={filterVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setFilterVisible(!filterVisible);
          }}>
            <View className='flex flex-col border-2 border-black
            h-full mt-80 rounded-3xl bg-gray-50'>
                <View className='flex flex-row justify-between'>
                    <Pressable>
                        <Text className='text-orange-300 underline mt-4 text-2xl ml-4
                        active:text-blue-400'>
                            Clear all
                        </Text>
                    </Pressable>

                    <Text className='font-bold text-3xl mt-8 mr-4'>
                        Filters
                    </Text>
                    <Pressable className='border-2 border-black h-14 w-14 rounded-full
                    items-center justify-center mt-4 mr-4 active:bg-blue-400'
                    
                    onPress={handleFilterVisible}>
                        <Text className='text-3xl '>
                            x
                        </Text>
                    </Pressable>
                </View>
                <View>
                    <Text className='text-2xl ml-4'>
                       Main Ingredient 
                    </Text>
                    <TextInput className='border-black
                    border-2 rounded-lg w-10/12 p-2 ml-4 mt-3'
                    placeholder='chicken, beef, pork, etc'/>
                </View>

                <View className='mt-4'>
                    <Text className='text-2xl ml-4'>
                       Category 
                    </Text>                   
                    <ScrollView horizontal = {true}
                    className='ml-4 mt-3 flex flex-row'>                   
                       {displayCategory}
                    </ScrollView>
                </View>

                <View className = "mt-4">
                   <Text className='text-2xl ml-4'>
                      Area 
                   </Text>                   
                    <ScrollView horizontal = {true}
                    className='ml-4 mt-3 flex flex-row'>                   
                       {displayArea}
                    </ScrollView>
                </View>
            </View>
            </Modal>
    );
}

export default Filter