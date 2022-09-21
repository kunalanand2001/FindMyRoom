import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const AccountScreen = () => {
  return (
    <View>
      {/* <Text>{auth.currentUser.email}</Text> */}
      <Button style={{margin:'30%'}} mode ="contained" >
        LogOut
      </Button>
    </View>
  )
}
// onPress={()=> auth.signOut()}
export default AccountScreen