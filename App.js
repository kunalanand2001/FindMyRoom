import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import { auth } from './firebase';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAd from './screens/CreateAd';
import ItemsList from './screens/ItemsList';
import AccountScreen from './screens/AccountScreen';
import Feather from 'react-native-vector-icons/Feather'



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};

const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    background: 'white',
  },
};



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home'

          } else if (route.name === 'create') {
            iconName = 'plus-circle'
          } else if (route.name === 'account') {
            iconName = "user"
          }


          return <View style={{ borderColor: "white", borderRadius: 30 }}><Feather name={iconName} size={30} color={color} /></View>
        },

      })}
    >
      <Tab.Screen name="home" component={ItemsList} />
      <Tab.Screen name="create" component={CreateAd} />
      <Tab.Screen name="account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const [user,setUser] = useState('')
  useEffect(()=>{
    const unsubscribe =  auth.onAuthStateChanged((userExist)=>{
      if(userExist){
           setUser(userExist)
          //  userExist.getIdToken().then(jwt=>{})
      }else{
           setUser("")
      }
    })
    return unsubscribe
  },[])

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {/* <ItemsList/> */}
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        {/* <ItemsList/> */}
        <Navigation />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
