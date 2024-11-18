import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import Welcome from "./Welcome";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from './Navbar';
import Home from "./Home";
import Recipe from './Recipe';
import DisplayRandom from './DisplayRandom';
import DisplaySearchResults from './DisplaySearchResults';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen 
        name = "Home"
        component={Home}
        options={{title:'Home'}}/>
        <Stack.Screen 
        name = "Login"
        component={Login}
        options={{title:'Login'}}/>

        <Stack.Screen 
        name = "Signup"
        component={Signup}
        options={{title:'Signup'}}/>
        
        <Stack.Screen 
        name = "Recipe"
        component={Recipe}
        options={{title:'Recipe'}}/>


      </Stack.Navigator>
    );
}

export default HomeStack;