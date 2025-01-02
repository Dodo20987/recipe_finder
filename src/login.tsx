import {Text,TextInput,View,Pressable} from 'react-native';
import React, {useState, useRef, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, loginRequest } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from './fetch';
import { useAuth } from './AuthContext';
import * as keychain from "react-native-keychain";
type navigationProps = NativeStackNavigationProp<RootStackParamList>;
import "../global.css";
const Login: React.FC = () => {
    const navigation = useNavigation<navigationProps>();
    const nameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const [error, setError] = useState<string>("");
    const [RegisterPressed, setRegisterPressed] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const {loggedIn, setLoggedIn} = useAuth();
    const handleSubmit = async () => {
        const loginObj : loginRequest = {name : "", password : ""};
        loginObj.name = nameRef.current;
        loginObj.password = passwordRef.current;
        const link = process.env.EXPO_PUBLIC_API_BASE + "/token";
        await login(link, loginObj, setSuccess);
    }

    useEffect(() => {
        if(success) {
            navigation.replace("Home");
            setLoggedIn(true);
        }
        else {
            setError("Invalid username, email, or password");
        }
    }, [success])
    const handleNameInput = (text: string) => {
        nameRef.current = text;
    }

    const handlePassInput = (text: string) => {
        passwordRef.current = text;
    }

    return <>
        <View className='flex flex-col'>
            <View className='flex justify-start items-center w-full mt-8'>
                <Text className='text-4xl font-bold'>Sign in</Text>
            </View>

            <View className = 'flex items-start w-full ml-4 mr-4 mt-20'>
                <Text className='text-xl'>Email or Username</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='example@mail.com'
                onChangeText={handleNameInput}
                />

                <Text className='text-xl'>Password</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='*******'
                onChangeText={handlePassInput}
                />
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-4'>
                <Pressable 
                onPress={() => navigation.navigate("Signup")}
                onPressIn={() => setRegisterPressed(true)}
                onPressOut={() => setRegisterPressed(false)}
                >
                    <Text className={`${RegisterPressed ? 'text-blue-400' : 'text-orange-600'}`}>Register</Text>
                </Pressable>
                <Text className='text-orange-600'>Forgot Password?</Text>
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-16'>
                {(loggedIn === false || loggedIn === undefined) && error !== "" ? (
                    <Text className='text-orange-600'>{error}</Text>
                ) : null}
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
