import {Text,TextInput,View,Pressable} from 'react-native';
import React, {useRef} from "react";
import { registerAccount } from './fetch';
import { User } from './types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import "../global.css";
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
type navigationProps = NativeStackNavigationProp<RootStackParamList>;

type PasswordInputProps = NativeStackScreenProps<RootStackParamList, "PasswordInput">

const PasswordInput: React.FC<PasswordInputProps> = ({route}) => {
    const navigation = useNavigation<navigationProps>();
    const passwordRef = useRef<string>("");
    const passwordConfirmRef = useRef<string>("");
    const errorRef = useRef<string>("");
    const {name, email} = route.params;
    console.log("password screen now name:", name);
    const handleSubmit = () => {
        /*if(passwordRef.current !== passwordConfirmRef.current) {
            errorRef.current = "Error: Passwords are not matching";
        }*/
        const userObj : User = {username : "", password : ""};
        userObj.username = name;
        userObj.password = passwordRef.current;
        userObj.email = (email !== "" && email) ? email : undefined;
        const link = process.env.EXPO_PUBLIC_API_BASE + "/save";
        registerAccount(link, userObj);
        navigation.navigate("Login");
    }
    const handlePassInput = (text: string) => {
        passwordRef.current = text;
    }
    const handlePassConfirmInput = (text: string) => {
        passwordConfirmRef.current = text;
    }
   return <>
        <View className='flex flex-col'>
            <View className='flex justify-start items-center w-full mt-8'>
                <Text className='text-4xl font-bold'>Create a password</Text>
            </View>

            <View className = 'flex items-start w-full ml-4 mr-4 mt-20'>

                <Text className='text-xl'>Password</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='*******'
                onChangeText={handlePassInput}
                />

                <Text className='text-xl'>Confirm Password</Text>
                <TextInput
                className='border-black border-2 w-11/12 rounded-lg h-14 mt-3 p-4 mb-8'
                placeholder='*******'
                onChangeText={handlePassConfirmInput}
                />
            </View>

            <View className='flex items-start w-full ml-4 mr-4 mt-16'>
                <Pressable className='flex justify-center items-center p-4 rounded-3xl bg-orange-600 h-16 w-11/12
                active:bg-blue-400'
                onPress={handleSubmit}
                >
                    <Text className='text-white font-bold text-lg'>SUBMIT</Text>
                </Pressable>
            </View> 
        </View>
    </>
}


export default PasswordInput;
