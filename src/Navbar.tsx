import {View, Text} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Favourite from "./Favourite";
import Profile from "./Profile";
import Saved from "./Saved";
import HomeStack from "./HomeStack";
const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name = "Home" component={HomeStack} options = {{headerShown : false}} />
            <Tab.Screen name = "Saved" component={Saved} />
            <Tab.Screen name = "Favourite" component={Favourite} />
            <Tab.Screen name = "Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Navbar;