import "../global.css";
import {View, Text, Pressable} from 'react-native';
import { StatusBar } from "expo-status-bar";
const Welcome = ({navigation}) => {
    return <>
    <View className = "flex font-bold items-center bg-orange-500 h-screen">
            <Text className='text-4xl font-bold text-white mt-20'>Welcome to Recipe Finder</Text>
            <StatusBar style="auto" />

            <Pressable className=" 
            flex
            border-black 
            border-2 w-11/12
            items-center
            mt-32
            p-4
            rounded-lg
            active:bg-blue-400"
            onPress= {() =>
                navigation.navigate("Login")
            }>
                <Text>
                    Login
                </Text>
            </Pressable>

            <Pressable className="
            flex
            border-black
            border-2 w-11/12
            items-center
            p-4
            rounded-lg
            mt-8
            active:bg-blue-400
            "
            onPress={() =>
                navigation.navigate("Signup")
            }>
                <Text>
                    Sign up
                </Text>
            </Pressable>

        <Pressable className=" 
            flex
            border-black 
            border-2 w-11/12
            items-center
            mt-32
            p-4
            rounded-lg
            active:bg-blue-400"
            onPress= {() =>
                navigation.navigate("Home")
            }>
                <Text>
                    Temp
                </Text>
            </Pressable>
          
    </View>
    </>
}

export default Welcome;