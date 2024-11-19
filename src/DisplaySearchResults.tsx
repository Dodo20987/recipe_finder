import {View, Text, Pressable, Image, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MealItem } from "./types";

const DisplaySearchResults = (displayResults : MealItem[]) => {
    const navigation = useNavigation();
    console.log("res: ",displayResults['displayResults'].length);
    return (
        <View>
            <ScrollView horizontal = {true}
            className = "mt-4">
                {displayResults["displayResults"].map((data, index) =>(
                    <View>
                        <Pressable
                        onPress = {() => navigation.navigate("Recipe", {ID : data.ID})}>
                            <Image
                                key={index}
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
        </View>
    );
}

export default DisplaySearchResults;