import { StatusBar } from 'expo-status-bar';
import "./global.css"
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import Welcome from "./src/Welcome";
import Login from "./src/Login";
import Signup from "./src/Signup";
import Navbar from './src/Navbar';
const Stack = createNativeStackNavigator();
export default function App() {
  const [Signedin, handleSignin] = useState(false);
  return (
    <NavigationContainer>    
      <Navbar />
      {/*
      <Stack.Navigator>
        <Stack.Screen 
        name = "Welcome"
        component={Welcome}
        options={{title:'Welcome'}}/>

        <Stack.Screen 
        name = "Login"
        component={Login}
        options={{title:'Login'}}/>

        <Stack.Screen 
        name = "Signup"
        component={Signup}
        options={{title:'Signup'}}/>

        <Stack.Screen 
        name = "Home"
        component={Home}
        options={{title:'Home'}}/>

        
      </Stack.Navigator>
      */}
    </NavigationContainer>
  );
}

