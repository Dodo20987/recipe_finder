import { StatusBar } from 'expo-status-bar';
import "./global.css"
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/home";
import Login from "./src/login";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>    
      <Stack.Navigator>
        <Stack.Screen 
        name = "Login"
        component={Login}
        options={{title:'Login'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

