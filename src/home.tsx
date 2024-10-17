import "../global.css";
import {View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";
const Home = () => {
    return <>
    <View className = "flex-1 align-middle justify-center font-bold bg-yellow-500">
          <Text className='text-8xl'>Open up home.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
    </View>
    </>
}

export default Home;