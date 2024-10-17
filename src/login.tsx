import {Text,TextInput,View,Pressable} from 'react-native';
import React, {useState, useEffect} from "react";

import "../global.css";
const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleSubmit = () => {
        console.log("button clicked");
        console.log("info:");
        console.log(email);
        console.log(password);
    }
    const handleEmailInput = (text: string) => {
        console.log("email input entered");
        setEmail(text);
        
    }
    const handlePassInput = (text: string) => {
        console.log("pass input entered");
        setPassword(text);
        
    }
    useEffect(() => {
        console.log(email);
    }, [email])
    return <>
        <View className='flex flex-col'>
            <View className='flex justify-start items-center w-full mt-8'>
                <Text className='text-4xl font-bold'>Sign in</Text>
            </View>

            <View className = 'flex items-start w-full ml-4 mr-4 mt-20'>
                <Text className='text-xl'>Email</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='example@mail.com'
                onChangeText={handleEmailInput}
                />

                <Text className='text-xl'>Password</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='*******'
                onChangeText={handlePassInput}
                />
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-4'>
                <Text className='text-orange-600'>Forgot Password?</Text>
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-16'>
                <Pressable className='flex justify-center items-center p-4 rounded-3xl bg-orange-600 h-16 w-11/12
                active:bg-blue-400'
                onPress={handleSubmit}
                >
                    <Text className='text-white font-bold text-lg'>SIGN IN</Text>
                </Pressable>
            </View> 
        </View>
    </>
}

export default Login;