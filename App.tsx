import { StatusBar } from 'expo-status-bar';
import "./global.css"
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import HomeStack from "./src/HomeStack";
import Navbar from './src/Navbar';
import { AuthProvider } from './src/AuthContext';
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>    
        <Navbar />
      </NavigationContainer>
    </AuthProvider> 
  );
}

