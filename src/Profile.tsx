import {Text, View, TextInput, Pressable} from "react-native"
import {getUserData} from "./fetch.tsx"
import {useState, useEffect, useRef} from "react";
import {MaterialIcons} from "@expo/vector-icons";
const Profile = () => {
  const [username, setUserName] = useState<string>("");
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const emailRef = useRef<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUserData();
      setUserName(userInfo.username);
    }
    getUserInfo();
  },[])
  
  const handleUsernameRef = (text : string) => {
    usernameRef.current = text;
  }

  const handlePasswordRef = (text : string) => {
    passwordRef.current = text;
  }
  
  const handleEmailRef = (text : string) => {
    emailRef.current = text;
  }


  const handleSubmit = () => {
    console.log("submit clicked");
  }

  return (
    <View className = "flex-1 items-center">

      {/*<!-- profile header containing current name and empty user profile picture -->*/}
      <View className = "flex items-center border-2 border-black w-full bg-orange-600">
        <Text className = "font-bold text-lg text-white mb-8">{username}'s profile</Text>
        <View>
          <MaterialIcons name="account-circle" size = {120} color = "white" />
        </View>
      </View>

      <View className = "flex flex-col w-full items-center mt-8">
        
        {/*<!-- username change --> */}
        <View className = " flex items-center w-full">
          <View className = "w-11/12">
            <Text className = "font-semibold">New Username</Text>
            <TextInput 
            className='border-black border-2 rounded-lg h-11 mt-2 p-4 mb-8'
            placeholder = "username"
            />
          </View>
        </View>
        
        {/*<!-- email change--> */}
        <View className = " flex items-center w-full">
          <View className = "w-11/12">
            <Text className = "font-semibold">New Email</Text>
            <TextInput 
            className='border-black border-2 rounded-lg h-11 mt-2 p-4 mb-8'
            placeholder = "example@mail.com"
            />
          </View>
        </View>
        
        {/*<!-- password change -->*/}
        <View className = " flex items-center w-full">
          <View className = "w-11/12">
            <Text className = "font-semibold">New Password</Text>
            <TextInput 
            className='border-black border-2 rounded-lg h-11 mt-2 p-4 mb-8'
            placeholder = "Password"
            />
          </View>
        </View>
        
        {/* accept changes button and submit and account deletion*/}
        <View className = "flex items-center w-full mt-4">
          <Pressable className = "flex items-center border-2 border-black bg-black rounded-lg p-2 w-10/12">
            <Text className = "text-white">SUBMIT CHANGES</Text>
          </Pressable>  

          <Pressable className = "flex items-center border-2 border-black bg-red-800 rounded-lg p-2 w-6/12 mt-8">
            <Text className = "text-white">DELETE ACCOUNT</Text>
          </Pressable>  

        </View>

      </View>
    </View>
  );

}

export default Profile;
