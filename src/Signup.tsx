import {Text,TextInput,View,Pressable} from 'react-native';
import React, {useRef} from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import "../global.css";
type navigationProps = NativeStackNavigationProp<RootStackParamList>;

const Signup: React.FC = () => {
    const navigation = useNavigation<navigationProps>()
    const emailRef = useRef("");
    const errorRef = useRef("");
    const nameRef = useRef("");
    const handleNameInput = (text: string) => {
        nameRef.current = text;
    }
    const handleEmailInput = (text: string) => {
        emailRef.current = text;
    }
    const handleNext = () => {
        navigation.navigate("PasswordInput", {name : nameRef.current, email : emailRef.current});
    }
    return <>
        <View className='flex flex-col'>
            <View className='flex justify-start items-center w-full mt-8'>
                <Text className='text-4xl font-bold'>Create a username</Text>
            </View>

            <View className = 'flex items-start w-full ml-4 mr-4 mt-20'>

                <Text className='text-xl'>Name</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='Enter a username'
                onChangeText={handleNameInput}
                />

                <Text className='text-xl'>Email (optional)</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='example@mail.com'
                onChangeText={handleEmailInput}
                />
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-16'>
                <Pressable className='flex justify-center items-center p-4 rounded-3xl bg-orange-600 h-16 w-11/12
                active:bg-blue-400'
                onPress={handleNext}
                >
                    <Text className='text-white font-bold text-lg'>NEXT</Text>
                </Pressable>
            </View> 
        </View>
    </>
}

export default Signup;