import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import useUserStore from '../Store/useUserStore';

// import Startup from './startup';

const IP = "10.89.23.254";

const App = () => {

  const[loading, setLoading] = useState(true);
  const { getUsername } = useUserStore();
  // return <Startup />;

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");

        if(!token){
          router.replace("/login");
          return;
        }

        // const res = await axios.get(`http://${IP}:3000/api/auth/check`, token);
        //This is the wrong way to send the token to the backend as the backend expects the second argument to be a param or a object or a header something like that not just plain constant it will be ignored so we have to send a header as we can send a param as it will be included in the url causing security risks.

        const res = await axios.get(`http://${IP}:3000/api/auth/check`,{
          headers:{
            Authorization : `Bearer ${token}`,
          }
        });

        if(!res){
          console.log("The token is not verified so redirect to login");
          router.replace("/login");
        }

        console.log("User is verified and already logged in.");

        //now lets get the username for the public store to use it later in the frontend.
        await getUsername(token);
        
        router.replace("/dashboard");
      } catch (error) {
        console.log("Error verifying if the user is logged in or not", error);
        router.replace("/login");
      } finally{
        setLoading(false);
      }
    };

    checkAuth();
  },[]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //We always need to return something so we have returned an empty <View/> as we are actually using router.replace() to go to the next pages.
  return <View/>
} 

export default App;
